import { StateAction, State, findUpgrade } from "@laundry/store";
import { Draft } from "immer";

export const eventHandler = (
  state: Draft<State>,
  action: StateAction,
): Draft<State> | undefined => {
  switch (action.type) {
    case "BUY_UPGRADE": {
      const { key } = action.payload;
      const { resources: stats, upgrades: purchasedUpgrades } = state;
      const currentLevel = purchasedUpgrades[key] ?? 0;
      const nextLevel = currentLevel + 1;

      const upgrade = findUpgrade(key);
      for (const costKey of Object.keys(upgrade.costs)) {
        const checker = upgrade.costs[costKey];
        if (checker && checker(nextLevel) > stats[costKey]) {
          return;
        }
      }
      if (currentLevel < upgrade.max) {
        for (const costKey of Object.keys(upgrade.costs)) {
          state.resources[costKey] -= upgrade.costs[costKey]?.(nextLevel) ?? 0;
        }
        purchasedUpgrades[key] = nextLevel;
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
