import {
  findExploration,
  findUpgrade,
  initialState,
  sources,
  State,
} from "@laundry/store";
import { isNonNullable } from "@laundry/utils";
import { sub } from "date-fns";
import { Draft } from "immer";
import { groupBy } from "lodash";

const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0);
const START_DATE = sub(THE_EVENT_DATE, { days: 30 });
const THE_EVENT_TIME = (THE_EVENT_DATE.valueOf() - START_DATE.valueOf()) / 1000;
const RESOURCE_GAIN_BASE_TIME = 20_000;
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
    elapsedTime = delta * state.multiplier;
  }
  updateTime(state, elapsedTime);
  updateEvent(state, delta);
  updatePreResources(state, elapsedTime);
  updatePostResources(state, elapsedTime);
  updatePostStats(state, elapsedTime);
  updateExplore(state, elapsedTime);
};

const updateTime: Updater = (state, delta) => {
  if (state.time === THE_EVENT_TIME && state.phase === "preEvent") {
    state.phase = "event";
    state.timers = { ...initialState.timers };
    state.multiplier = 1;
    state.messages = ["You wake up in a wasteland. Where... when are you?"];
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

  // filter timed upgrades by current time, and convert to same format
  // group all upgrades by source
  // filter by whether the source is active
  // and sort by add, then multiply
  // add all add upgrades together
  // multiply by each multiply upgrade

  const allUpgrades = Object.entries(state.upgrades)
    .map(([key, value]) => {
      if (!value) {
        return null;
      }
      return { key, level: value.level, upgrade: findUpgrade(key) };
    })
    .concat(
      Object.entries(state.timedUpgrades).map(([key, value]) => {
        if (!value || value.time < state.time) {
          return null;
        }
        return { key, level: value.level, upgrade: findUpgrade(key) };
      }),
    )
    .filter(isNonNullable)
    .sort((a, b) => {
      const typeA = a.upgrade.effect.type;
      const typeB = b.upgrade.effect.type;
      if (typeA === typeB) {
        return 0;
      }
      if (typeA === "add" && typeB === "multiply") {
        return -1;
      }
      return 1;
    });

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
    const time = sourceUpgrades.reduce((acc, value) => {
      const func = value.upgrade.effect[source.resource];
      if (func && value.upgrade.effect.type === "time") {
        return Math.floor(acc * func(value.level));
      }
      return acc;
    }, RESOURCE_GAIN_BASE_TIME);

    // apply upgrades to time
    const counts = Math.floor(timers[source.key] / time);

    if (counts) {
      const upgradedCounts = sourceUpgrades.reduce((acc, value) => {
        const upgrade = value.upgrade;
        const effect = upgrade.effect[source.resource];
        if (effect && upgrade.effect.type === "add") {
          return acc + effect(value.level);
        } else if (effect && upgrade.effect.type === "multiply") {
          return acc * effect(value.level);
        }
        return acc;
      }, 0);

      timers[source.key] = timers[source.key] % time;
      state.resources[source.resource] += counts * upgradedCounts;
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
      state.skills[stat].current += (delta * rate) / 20000;
    }
  }
};

const updateExplore: Updater = (state, delta) => {
  const time = delta;

  if (state.phase === "postEvent" && state.resources.food <= 0) {
    state.phase = "traveling";
    state.multiplier = 1;
    state.timers = { ...initialState.timers };
    state.messages.push(
      "With your supplies gone, the only thing left is to send help to your past. With luck, you'll survive.",
    );
  }

  if (!state.exploration) {
    return;
  }
  const exploration = findExploration(state.exploration);
  const progress = (100 / exploration.time) * time;
  state.explorations[state.exploration] ??= { progress: 0 };
  state.explorations[state.exploration]!.progress = Math.min(
    (state.explorations[state.exploration]!.progress ?? 0) + progress,
    100,
  );
  if (state.explorations[state.exploration]!.progress === 100) {
    state.exploration = undefined;
    if (exploration.message) {
      state.messages.push(exploration.message);
    }
  }
};
