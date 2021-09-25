import { StateAction, State } from "@thing/store";
import { getPhase, Phase } from "@thing/utils";
import { Draft } from "immer";
import { games } from "libs/data/games";

export const eventHandler = (state: Draft<State>, action: StateAction) => {
  switch (action.type) {
    case "NEXT":
      // determine next action based on time
      if (state.action !== "idle") {
        return;
      }
      const timeOfDay = state.time % 86_400_000;
      const phase = getPhase(timeOfDay);
      state.action = phase;
      const message = getMessage(state, phase);
      if (message) {
        state.messages.push(message);
      }
      break;
    case "BUY_GAME": {
      state.game = games.find((game) => game.key === action.payload.key)!;
      break;
    }
    case "WEAR_CLOTHING": {
      const { key, reuse } = action.payload;
      if (state.wornClothing[key] !== undefined) {
        const current = Number(state.wornClothing[key]);
        state.clothing[key][current] = (state.clothing[key][current] ?? 0) + 1;
      }
      state.wornClothing[key] = reuse;
      state.clothing[key][reuse] = (state.clothing[key][reuse] ?? 0) - 1;
      break;
    }
    case "REMOVE_CLOTHING": {
      const { key } = action.payload;
      if (state.wornClothing[key] !== undefined) {
        const current = Number(state.wornClothing[key]);
        state.clothing[key][current] = (state.clothing[key][current] ?? 0) + 1;
        state.wornClothing[key] = undefined;
      }
      break;
    }
    // case "BUY_UPGRADE": {
    //   state.game = games.find((game) => game.key === action.payload.key)!;
    //   break;
    // }
  }
};

const getMessage = (state: Draft<State>, phase: Phase) => {
  if (state.wornClothing.underpants === undefined && phase === "working") {
    return "I guess no one can tell I'm not wearing underpants, but this still feels wrong.";
  } else if (state.wornClothing.sock === undefined && phase === "working") {
    return "I really should have worn socks. My shoes are getting gross.";
  }
};
