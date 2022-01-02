import { StateAction, State, findUpgrade } from "@laundry/store";
import { Draft } from "immer";

export const eventHandler = (state: Draft<State>, action: StateAction) => {
  switch (action.type) {
    case "BUY_UPGRADE": {
      const { key } = action.payload;
      const { stats, upgrades: purchasedUpgrades } = state;
      const currentLevel = purchasedUpgrades[key] ?? 0;
      const upgrade = findUpgrade(key);
      if (
        upgrade.costs.desperation &&
        upgrade.costs.desperation(currentLevel) > stats.desperation
      ) {
        return;
      }
      if (
        upgrade.costs.things &&
        upgrade.costs.things(currentLevel) > stats.things
      ) {
        return;
      }
      if (currentLevel < upgrade.max) {
        const newLevel = currentLevel + 1;
        state.stats.things -= upgrade.costs.things?.(newLevel) ?? 0;
        state.stats.desperation -= upgrade.costs.desperation?.(newLevel) ?? 0;
        purchasedUpgrades[key] = currentLevel + 1;
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
