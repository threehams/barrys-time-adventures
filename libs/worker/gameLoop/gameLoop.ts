import { findAction, findUpgrade, State } from "@laundry/store";
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
  updateExplore(state, elapsedTime);
};

const updateTime: Updater = (state, delta) => {
  if (state.time === THE_EVENT_TIME && state.phase === "preEvent") {
    state.phase = "event";
    state.timers.event = 0;
    state.timers.things = 0;
    state.multiplier = 1;
    state.messages.push("You wake up in a wasteland. Where... when are you?");
    return;
  }

  if (state.phase !== "event" && state.phase !== "traveling") {
    state.time = state.time + delta;
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

  timers.things += delta;
  const counts = Math.floor(timers.things / (1_000 / THINGS_MULTIPLIER));

  if (counts) {
    const upgradedCounts = Object.entries(state.upgrades).reduce(
      (acc, [key, level]) => {
        const upgrade = findUpgrade(key);
        if (upgrade.phase !== phase) {
          return acc;
        }
        if (upgrade.effect.things) {
          return upgrade.effect.things(acc, level ?? 0);
        }
        return counts;
      },
      counts,
    );
    timers.things = timers.things % (1_000 / THINGS_MULTIPLIER);
    state.resources.things += upgradedCounts;
  }
};

const updatePostResources: Updater = (state, delta) => {
  const { timers, phase } = state;
  if (phase !== "postEvent") {
    return;
  }

  timers.things += delta;
  const counts = Math.floor(timers.things / (1_000 / THINGS_MULTIPLIER));

  if (counts) {
    const upgradedCounts = Object.entries(state.upgrades).reduce(
      (acc, [key, level]) => {
        const upgrade = findUpgrade(key);
        if (upgrade.phase !== phase) {
          return acc;
        }
        if (upgrade.effect.things) {
          return upgrade.effect.things(acc, level ?? 0);
        }
        return counts;
      },
      counts,
    );
    timers.things = timers.things % (1_000 / THINGS_MULTIPLIER);
    state.resources.things = Math.max(
      state.resources.things - upgradedCounts,
      0,
    );
  }
};

const updateExplore: Updater = (state, delta) => {
  if (state.phase === "postEvent" && state.resources.things <= 0) {
    state.phase = "traveling";
    state.multiplier = 1;
    state.timers = {
      event: 0,
      things: 0,
      action: 0,
    };
    state.messages.push(
      "With your supplies gone, the only thing left is to send help to your past. With luck, you'll survive.",
    );
  }

  if (!state.action) {
    return;
  }
  const exploration = findAction(state.action);
  const progress = (100 / exploration.time) * delta;
  state.actions[state.action] = Math.min(
    (state.actions[state.action] ?? 0) + progress,
    100,
  );
  if (state.actions[state.action] === 100) {
    state.action = undefined;
  }
};
