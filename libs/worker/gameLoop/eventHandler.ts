import { StateAction, State, findUpgrade } from "@laundry/store";
import { hoursToSeconds } from "date-fns";
import { Draft } from "immer";

export const eventHandler = (
  state: Draft<State>,
  action: StateAction,
): Draft<State> | undefined => {
  switch (action.type) {
    case "BUY_UPGRADE": {
      const { key } = action.payload;
      const { resources, upgrades: purchasedUpgrades } = state;
      const currentLevel = purchasedUpgrades[key]?.level ?? 0;
      const nextLevel = currentLevel + 1;

      const upgrade = findUpgrade(key);
      for (const costKey of Object.keys(upgrade.costs)) {
        const checker = upgrade.costs[costKey];
        if (checker && checker(nextLevel, 0) > resources[costKey]) {
          return;
        }
      }
      if (currentLevel < upgrade.max) {
        for (const costKey of Object.keys(upgrade.costs)) {
          state.resources[costKey] -=
            upgrade.costs[costKey]?.(nextLevel, 0) ?? 0;
        }
        purchasedUpgrades[key] = { level: nextLevel };
        state.timeline.push({
          time: state.time,
          action,
        });
      }
      break;
    }
    case "BUY_TIMED_UPGRADE": {
      const { key, day } = action.payload;
      const distance = 29 - day;
      const { resources, timedUpgrades: purchasedUpgrades } = state;
      const currentLevel = purchasedUpgrades[key]?.level ?? 0;
      const nextLevel = currentLevel + 1;

      const upgrade = findUpgrade(key);
      for (const costKey of Object.keys(upgrade.costs)) {
        const checker = upgrade.costs[costKey];
        if (checker && checker(nextLevel, distance) > resources[costKey]) {
          return;
        }
      }
      if (currentLevel < upgrade.max) {
        for (const costKey of Object.keys(upgrade.costs)) {
          state.resources[costKey] -=
            upgrade.costs[costKey]?.(nextLevel, distance) ?? 0;
        }
        purchasedUpgrades[key] = {
          level: nextLevel,
          time: hoursToSeconds(24 * day),
        };
      }
      break;
    }
    case "SET_MULTIPLIER":
      state.multiplier = action.payload.multiplier;
      break;
    case "EXPLORE":
      if (state.phase !== "postEvent") {
        return;
      }
      if (state.exploration === action.payload.location) {
        state.exploration = undefined;
        return;
      }

      state.exploration = action.payload.location;
      break;
  }
};
