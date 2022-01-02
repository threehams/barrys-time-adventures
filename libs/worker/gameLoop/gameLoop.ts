import { findUpgrade, State } from "@laundry/store";
import { sub } from "date-fns";
import { Draft } from "immer";

const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0);
const START_DATE = sub(THE_EVENT_DATE, { days: 30 });
const THE_EVENT_TIME = THE_EVENT_DATE.valueOf() - START_DATE.valueOf();

export const gameLoop = (state: Draft<State>, delta: number) => {
  updateTime(state, delta * state.multiplier);
  updateThings(state, delta * state.multiplier);
};

const updateTime = (state: Draft<State>, delta: number) => {
  if (state.time === THE_EVENT_TIME) {
    state.action = "idle";
    return;
  }

  state.time = Math.min(state.time + delta * 1000, THE_EVENT_TIME);
};

const THINGS_MULTIPLIER = 1;

const updateThings = (state: Draft<State>, delta: number) => {
  const { timers } = state;

  timers.things += delta;
  const counts = Math.floor(timers.things / (1000 / THINGS_MULTIPLIER));

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
    timers.things = timers.things % (1000 / THINGS_MULTIPLIER);
    state.stats.things += upgradedCounts;
  }
};
