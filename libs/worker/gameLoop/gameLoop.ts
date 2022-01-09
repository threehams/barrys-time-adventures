import {
  findExploration,
  findUpgrade,
  getAllUpgrades,
  getSourceAmount,
  getSourceTime,
  initialState,
  sources,
  State,
} from "@laundry/store";
import { sub } from "date-fns";
import { Draft } from "immer";
import { groupBy } from "lodash";

const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0);
const START_DATE = sub(THE_EVENT_DATE, { days: 30 });
const THE_EVENT_TIME = (THE_EVENT_DATE.valueOf() - START_DATE.valueOf()) / 1000;
const RESOURCE_DRAIN_BASE_TIME = 1_000;

type Updater = (state: Draft<State>, delta: number) => Draft<State> | void;

export const updateGame: Updater = (state, delta) => {
  let elapsedTime;
  if (state.phase === "preEvent") {
    elapsedTime = Math.min(
      delta * state.multiplier,
      THE_EVENT_TIME - state.time,
    );
  } else {
    elapsedTime = delta * state.multiplier * 25;
  }
  updateTime(state, elapsedTime);
  updateEvent(state, delta);
  updatePreResources(state, elapsedTime);
  updatePostResources(state, elapsedTime);
  updatePostStats(state, elapsedTime);
  updateExplore(state, elapsedTime);
  updateMessages(state, elapsedTime);
};

const updateMessages: Updater = (state, delta) => {
  for (const [key, value] of Object.entries(state.timedUpgrades)) {
    const upgrade = findUpgrade(key);
    if (!value || upgrade.type !== "event") {
      continue;
    }

    if (value.time < state.time && value.time > state.time - delta) {
      const text = upgrade.flavorTexts[value.level];
      if (text) {
        state.messages.push({ priority: "alert", text });
      }
    }
  }
};

const updateTime: Updater = (state, delta) => {
  if (state.time === THE_EVENT_TIME && state.phase === "preEvent") {
    state.phase = "event";
    state.timers = { ...initialState.timers };
    state.multiplier = 1;
    state.messages = [
      { priority: "info", text: "That was strange. Where am I?" },
    ];
    return;
  }

  if (state.phase !== "event" && state.phase !== "traveling") {
    if (
      state.phase === "preEvent" ||
      (state.phase === "postEvent" && state.exploration)
    ) {
      state.time = state.time + delta;
    }
  }
};

const updateEvent: Updater = (state, delta) => {
  if (state.phase !== "event") {
    return;
  }
  state.timers.event += delta;
  if (state.timers.event > 1_000) {
    state.timers.event = 0;
    state.phase = "postEvent";
  }
};

const updatePreResources: Updater = (state, delta) => {
  const { timers, phase } = state;
  if (phase !== "preEvent") {
    return;
  }

  const allUpgrades = getAllUpgrades(state);
  const upgradesBySource = groupBy(
    allUpgrades,
    (value) => value.upgrade.source,
  );

  for (const source of sources) {
    const sourceUpgrades = upgradesBySource[source.key];
    if (!sourceUpgrades) {
      continue;
    }

    timers[source.key] += delta;
    const time = getSourceTime(sourceUpgrades, source);

    // apply upgrades to time
    const counts = Math.floor(timers[source.key] / time);

    if (counts) {
      const perCount = getSourceAmount(sourceUpgrades, source);

      timers[source.key] = timers[source.key] % time;
      state.resources[source.resource] += counts * perCount;
    }
  }
};

const updatePostResources: Updater = (state, delta) => {
  const { timers, phase } = state;
  if (phase !== "postEvent" || !state.exploration) {
    return;
  }

  timers.food += delta;
  const counts = Math.floor(timers.food / RESOURCE_DRAIN_BASE_TIME);

  if (counts) {
    const upgradedCounts = Object.entries(state.upgrades).reduce(
      (acc, [key, level]) => {
        const upgrade = findUpgrade(key);
        if (upgrade.phase !== phase) {
          return acc;
        }
        if (upgrade.effect.food) {
          return upgrade.effect.food(level?.level ?? 0);
        }
        return counts;
      },
      counts,
    );
    timers.food = timers.food % RESOURCE_DRAIN_BASE_TIME;
    state.resources.food = Math.max(state.resources.food - upgradedCounts, 0);
  }
};

const updatePostStats: Updater = (state, delta) => {
  if (state.phase !== "postEvent" || !state.exploration) {
    return;
  }

  const exploration = findExploration(state.exploration);
  for (const [stat, rate] of Object.entries(exploration.train)) {
    if (rate) {
      state.skills[stat].current += (delta * rate) / 200000;
    }
  }
};

const updateExplore: Updater = (state, delta) => {
  const time = delta;

  if (state.phase === "postEvent" && state.resources.food <= 0) {
    state.phase = "traveling";
    state.exploration = undefined;
    state.multiplier = 1;
    state.timers = { ...initialState.timers };
    state.messages.push({
      priority: "alert",
      text: "My supplies are gone. I should go help out Past Barry so I can be better prepared.",
    });
  }

  if (!state.exploration) {
    return;
  }
  const exploration = findExploration(state.exploration);
  const totalSkills = Object.entries(exploration.train).reduce(
    (acc, [key, multiplier]) => {
      if (!multiplier) {
        return acc;
      }
      return state.skills[key].current * multiplier;
    },
    0,
  );

  const progress = (100 / exploration.time) * (time * Math.log(totalSkills));
  state.explorations[state.exploration] ??= { progress: 0 };
  state.explorations[state.exploration]!.progress = Math.min(
    (state.explorations[state.exploration]!.progress ?? 0) + progress,
    100,
  );
  if (state.explorations[state.exploration]!.progress === 100) {
    state.exploration = undefined;
    if (exploration.message) {
      state.messages.push({ priority: "info", text: exploration.message });
    }
  }
};
