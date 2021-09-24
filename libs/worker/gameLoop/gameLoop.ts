import { State } from "@thing/store";
import { Draft } from "immer";
import { getPhase } from "@thing/utils";

export const gameLoop = (state: Draft<State>, delta: number) => {
  updateTime(state, delta);
};

const updateTime = (state: Draft<State>, delta: number) => {
  // const timeMultiplier = upgradesData.map((upgrade) => {
  //   return {...upgrade, level: state.upgrades[upgrade.key] }
  // }).reduce((total, upgrade) => {
  //   const timeUpgrades = upgrade.effects.filter(effect => effect.time)
  //   return total
  // }, delta)
  const totalTime = delta * 1000;

  if (state.action === "idle") {
    return;
  }
  if (state.action === "sleeping") {
    // can't really make sleeping go faster... or can we?

    state.time += totalTime * SLEEP_MULTIPLIER;
    if (getPhase(state.time) !== "sleeping") {
      state.action = "idle";
    }
  }
  if (state.action === "working") {
    // more enjoyable jobs go by faster
    state.time += totalTime * state.job.enjoyment;
    if (getPhase(state.time) !== "working") {
      state.action = "idle";
    }
  }
  if (state.action === "gaming") {
    // more addictive games eat time faster
    state.time += totalTime * state.game.compulsion;
    if (getPhase(state.time) !== "gaming") {
      state.action = "idle";
    }
  }
};

const SLEEP_MULTIPLIER = 50;
