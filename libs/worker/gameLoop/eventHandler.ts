import { StateAction, State } from "@thing/store";
import { getPhase } from "@thing/utils";
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
      state.action = getPhase(timeOfDay);
      break;
    case "BUY_GAME": {
      state.game = games.find((game) => game.key === action.payload.key)!;
      break;
    }
    // case "BUY_UPGRADE": {
    //   state.game = games.find((game) => game.key === action.payload.key)!;
    //   break;
    // }
  }
};
