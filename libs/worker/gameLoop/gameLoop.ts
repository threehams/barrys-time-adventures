import { State } from "@laundry/store";
import { sub } from "date-fns";
import { Draft } from "immer";

const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0);
const START_DATE = sub(THE_EVENT_DATE, { days: 30 });
const THE_EVENT_TIME = THE_EVENT_DATE.valueOf() - START_DATE.valueOf();

export const gameLoop = (state: Draft<State>, delta: number) => {
  updateTime(state, delta);
};

const updateTime = (state: Draft<State>, delta: number) => {
  const totalTime = delta * (1000 * state.multiplier);
  if (state.time === THE_EVENT_TIME) {
    state.action = "idle";
    return;
  }

  state.time = Math.min(state.time + totalTime, THE_EVENT_TIME);
};
