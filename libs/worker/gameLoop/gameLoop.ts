import { State } from "@laundry/store";
import { Draft } from "immer";

export const gameLoop = (state: Draft<State>, delta: number) => {
  updateTime(state, delta);
};

const updateTime = (state: Draft<State>, delta: number) => {
  const totalTime = delta * 1000;
  state.time += totalTime;
};
