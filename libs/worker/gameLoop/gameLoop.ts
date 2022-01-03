import { findExploration, findUpgrade, State } from "@laundry/store";
import { sub } from "date-fns";
import { Draft } from "immer";

const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0);
const START_DATE = sub(THE_EVENT_DATE, { days: 30 });
const THE_EVENT_TIME = (THE_EVENT_DATE.valueOf() - START_DATE.valueOf()) / 1000;

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
    state.timers = {
      action: 0,
      event: 0,
      food: 0,
      money: 0,
      water: 0,
    };
    state.multiplier = 1;
    state.messages.push("You wake up in a wasteland. Where... when are you?");
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

const THINGS_MULTIPLIER = 1;

const updatePreResources: Updater = (state, delta) => {
  const { timers, phase } = state;
  if (phase !== "preEvent") {
    return;
  }

  const resources = [{ key: "food" }, { key: "water" }] as const;
  for (const resource of resources) {
    timers[resource.key] += delta;
    const counts = Math.floor(
      timers[resource.key] / (1_000 / THINGS_MULTIPLIER),
    );

    if (counts) {
      const upgradedCounts = Object.entries(state.upgrades).reduce(
        (acc, [key, value]) => {
          const upgrade = findUpgrade(key);
          if (upgrade.effect[resource.key]) {
            return upgrade.effect[resource.key]!(acc, value?.level ?? 0);
          }
          return counts;
        },
        counts,
      );
      const timedUpgradedCounts = Object.entries(state.timedUpgrades).reduce(
        (acc, [key, value]) => {
          if (!value || state.time < value.time) {
            return acc;
          }
          const upgrade = findUpgrade(key);
          if (upgrade.effect[resource.key]) {
            return upgrade.effect[resource.key]!(acc, value?.level ?? 0);
          }
          return counts;
        },
        upgradedCounts,
      );
      timers[resource.key] = timers[resource.key] % (1_000 / THINGS_MULTIPLIER);
      state.resources[resource.key] += timedUpgradedCounts;
    }
  }
};

const updatePostResources: Updater = (state, delta) => {
  const { timers, phase } = state;
  if (phase !== "postEvent" || !state.exploration) {
    return;
  }

  timers.food += delta;
  const counts = Math.floor(timers.food / (1_000 / THINGS_MULTIPLIER));

  if (counts) {
    const upgradedCounts = Object.entries(state.upgrades).reduce(
      (acc, [key, level]) => {
        const upgrade = findUpgrade(key);
        if (upgrade.phase !== phase) {
          return acc;
        }
        if (upgrade.effect.food) {
          return upgrade.effect.food(acc, level?.level ?? 0);
        }
        return counts;
      },
      counts,
    );
    timers.food = timers.food % (1_000 / THINGS_MULTIPLIER);
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
      state.stats[stat].current += (delta * rate) / 20000;
    }
  }
};

const updateExplore: Updater = (state, delta) => {
  if (state.phase === "postEvent" && state.resources.food <= 0) {
    state.phase = "traveling";
    state.multiplier = 1;
    state.timers = {
      money: 0,
      water: 0,
      event: 0,
      food: 0,
      action: 0,
    };
    state.messages.push(
      "With your supplies gone, the only thing left is to send help to your past. With luck, you'll survive.",
    );
  }

  if (!state.exploration) {
    return;
  }
  const exploration = findExploration(state.exploration);
  const progress = (100 / exploration.time) * delta;
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
