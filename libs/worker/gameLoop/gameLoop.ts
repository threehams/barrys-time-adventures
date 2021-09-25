import { State } from "@thing/store";
import { Draft } from "immer";
import { getPhase } from "@thing/utils";

export const gameLoop = (state: Draft<State>, delta: number) => {
  updateTime(state, delta);
};

const updateTime = (state: Draft<State>, delta: number) => {
  const totalTime = delta * 1000;

  if (state.action === "idle") {
    return;
  }
  if (state.action === "sleeping") {
    // can't really make sleeping go faster... or can we?

    state.time += totalTime * SLEEP_MULTIPLIER;
    if (getPhase(state.time) !== "sleeping") {
      removeClothing(state);
      state.messages.push("I need to pick out something to wear to work.");
      state.action = "idle";
    }
  }
  if (state.action === "working") {
    // more enjoyable jobs go by faster
    state.time += totalTime * state.job.enjoyment;
    if (getPhase(state.time) !== "working") {
      dirtyClothing(state);
      state.action = "idle";
      state.messages.push("Work was exhausting. I should do something fun.");
    }
  }
  if (state.action === "gaming") {
    // more compulsive games eat time faster
    state.time += totalTime * state.game.compulsion;
    if (getPhase(state.time) !== "gaming") {
      removeClothing(state);
      state.messages.push("I should change for bed.");
      state.action = "idle";
    }
  }
};

const SLEEP_MULTIPLIER = 50;

const dirtyClothing = (state: Draft<State>) => {
  Object.keys(state.wornClothing).forEach((name) => {
    const currentReuse = state.wornClothing[name];
    if (currentReuse !== undefined) {
      state.wornClothing[name] = currentReuse + 1;
    }
  });
};

const removeClothing = (state: Draft<State>) => {
  Object.keys(state.wornClothing).forEach((name) => {
    const currentReuse = state.wornClothing[name];
    if (currentReuse !== undefined) {
      state.clothing[name][currentReuse] =
        (state.clothing[name][currentReuse] ?? 0) + 1;
      state.wornClothing[name] = undefined;
    }
  });
};
