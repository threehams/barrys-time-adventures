import { findUpgrade, State } from "@laundry/store";
import { sub } from "date-fns";
import { Draft } from "immer";

const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0);
const START_DATE = sub(THE_EVENT_DATE, { days: 30 });
const THE_EVENT_TIME = THE_EVENT_DATE.valueOf() - START_DATE.valueOf();

export const gameLoop = (state: Draft<State>, delta: number) => {
  let elapsedTime;
  if (state.phase === "preEvent") {
    elapsedTime = Math.min(
      delta * state.multiplier * 1000,
      THE_EVENT_TIME - state.time,
    );
  } else {
    elapsedTime = delta * state.multiplier * 1000;
  }
  updateTime(state, elapsedTime);
  updateEvent(state, delta * 1000);
  updateThings(state, elapsedTime);
  updateLoop(state, elapsedTime);
};

const updateTime = (state: Draft<State>, delta: number) => {
  if (state.time === THE_EVENT_TIME && state.phase === "preEvent") {
    state.phase = "event";
    state.timers.event = 0;
    state.multiplier = 1;
    state.messages.push("Judgement Day has come.");
    return;
  }

  if (state.phase !== "event") {
    state.time = state.time + delta;
  }
};

const updateEvent = (state: Draft<State>, delta: number) => {
  if (state.phase !== "event") {
    return;
  }
  state.timers.event += delta;
  if (state.timers.event > 1_000_000) {
    state.timers.event = 0;
    state.phase = "postEvent";
  }
};

const THINGS_MULTIPLIER = 1;

const updateThings = (state: Draft<State>, delta: number) => {
  const { timers, phase: action } = state;
  if (action !== "preEvent") {
    return;
  }

  timers.things += delta;
  const counts = Math.floor(timers.things / (1_000_000 / THINGS_MULTIPLIER));

  if (counts) {
    const upgradedCounts = Object.entries(state.upgrades).reduce(
      (acc, [key, level]) => {
        const upgrade = findUpgrade(key);
        if (upgrade.effect.things) {
          return upgrade.effect.things(acc, level ?? 0);
        }
        return counts;
      },
      counts,
    );
    timers.things = timers.things % (1_000_000 / THINGS_MULTIPLIER);
    state.stats.things += upgradedCounts;
  }
};

const updateLoop = (state: Draft<State>, delta: number) => {
  return;
};
