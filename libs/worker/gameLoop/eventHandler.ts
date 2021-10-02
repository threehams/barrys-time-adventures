import { StateAction, State, findUpgrade } from "@laundry/store";
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
    case "BUY_UPGRADE": {
      const { key } = action.payload;
      const upgrade = findUpgrade(key);
      if (
        state.stats.money >= upgrade.costs.money &&
        state.stats.desperation >= upgrade.costs.desperation &&
        state.stats.shame >= upgrade.costs.shame &&
        (state.upgrades[key] ?? 0) < upgrade.max
      ) {
        state.stats.money -= upgrade.costs.money;
        state.stats.desperation -= upgrade.costs.desperation;
        state.stats.shame -= upgrade.costs.shame;
        state.upgrades[key] = (state.upgrades[key] ?? 0) + 1;
      }
      break;
    }
    case "BUY_CLOTHING": {
      const { key } = action.payload;
      const garment = findGarment(key);
      if (state.stats.money >= garment.cost) {
        state.stats.money -= garment.cost;
        state.closet[key] ??= {};
        state.closet[key][0] = (state.closet[key][0] ?? 0) + 1;
      }
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
