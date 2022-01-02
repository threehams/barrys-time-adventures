import { StateAction, State, findUpgrade } from "@laundry/store";
import { Draft } from "immer";

export const eventHandler = (state: Draft<State>, action: StateAction) => {
  switch (action.type) {
    case "BUY_UPGRADE": {
      const { key } = action.payload;
      const upgrade = findUpgrade(key);
      if (
        state.stats.money >= upgrade.costs.money &&
        state.stats.desperation >= upgrade.costs.desperation &&
        (state.upgrades[key] ?? 0) < upgrade.max
      ) {
        state.stats.money -= upgrade.costs.money;
        state.stats.desperation -= upgrade.costs.desperation;
        state.upgrades[key] = (state.upgrades[key] ?? 0) + 1;
        state.timeline.push({
          time: state.time,
          action,
        });
      }
      break;
    }
    case "SET_MULTIPLIER":
      state.multiplier = action.payload.multiplier;
  }
};
