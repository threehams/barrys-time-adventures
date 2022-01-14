import {
  StateAction,
  State,
  findUpgrade,
  initialState,
  findUnlockFor,
} from "@laundry/store";
import { hoursToSeconds } from "date-fns";
import { Draft } from "immer";
import { updateGame } from "./gameLoop";

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
          state.resources[costKey] -= Math.floor(
            upgrade.costs[costKey]?.(nextLevel, 0) ?? 0,
          );
        }
        purchasedUpgrades[key] = { level: nextLevel };
        const unlock = findUnlockFor({ upgrade: action.payload.key });
        if (unlock) {
          state.unlocks[unlock.key] = true;
        }
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
    case "TRAVEL": {
      travel(state, action.payload.day);
      state.skills = {
        ...initialState.skills,
      };
      break;
    }
    case "LOOP":
      if (state.phase !== "traveling") {
        return;
      }
      travel(state, 29);
      state.loops += 1;
      state.phase = "postEvent";
      break;
    case "SET_AUTO_PURCHASE": {
      state.autoUpgrade[action.payload.key] = action.payload.enabled;
      break;
    }
    case "SET_AUTO_MAX_LEVEL": {
      state.autoUpgradeLevels[action.payload.key] = action.payload.maxLevel;
      break;
    }
  }
};

const travel = (state: Draft<State>, day: number) => {
  state.replay = true;
  state.multiplier = 1;
  state.exploration = undefined;
  state.explorations = {};
  state.resources = {
    ...initialState.resources,
  };
  state.maxResources = {
    ...initialState.maxResources,
  };
  state.time = 0;
  state.phase = "preEvent";
  state.upgrades = {
    ...initialState.upgrades,
    ...Object.fromEntries(
      Object.entries(state.upgrades)
        .filter(([key]) => {
          return findUpgrade(key).phase !== "preEvent";
        })
        .map(([key, level]) => {
          return [key, level] as const;
        }),
    ),
  };
  // If you've never unlocked loop, permanent gains get reset
  if (!state.unlocks.loop) {
    for (const key of Object.keys(state.skills)) {
      state.skills[key].permanent = 0;
    }
  }
  state.messages = [...initialState.messages];
  // get the current timeline before resetting it
  const timeline = state.timeline;
  state.timeline = [];

  let last = 0;
  for (const event of timeline) {
    if (Math.floor(event.time / hoursToSeconds(24)) >= day) {
      break;
    }
    updateGame(state, event.time - last);
    eventHandler(state, event.action);
    last = event.time;
  }
  updateGame(state, hoursToSeconds(24) * day - last);
  state.replay = false;
};
