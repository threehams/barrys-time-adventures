import { StateAction, State } from "@laundry/store";
import { getPhase, Phase } from "@laundry/utils";
import { Draft } from "immer";
import { findGarment, games } from "@laundry/store";
import { removeGarments } from "./removeGarments";

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
      const garment = findGarment(key);

      removeGarments(state, garment.slots);
      for (const slot of garment.slots) {
        state.wornClothing[slot] = { key, reuse };
      }
      state.closet[key][reuse] = (state.closet[key][reuse] ?? 0) - 1;
      break;
    }
    case "REMOVE_CLOTHING": {
      const { slot } = action.payload;
      removeGarments(state, [slot]);
      break;
    }
  }
};

const getMessage = (state: Draft<State>, phase: Phase) => {
  if (state.wornClothing.crotch === undefined && phase === "working") {
    return "I guess no one can tell I'm not wearing underpants, but this still feels wrong.";
  } else if (state.wornClothing.feet === undefined && phase === "working") {
    return "I really should have worn socks. My shoes are getting gross.";
  }
};
