import { ExplorationKey, UpgradeKey } from ".";
import { Message } from "..";

export type UnlockKey = "pastRestart" | "loop" | "pastSpeed2x";
export type Unlock = {
  key: UnlockKey;
  requirements: {
    upgrade?: UpgradeKey;
    exploration?: ExplorationKey;
  };
  message: Message;
};

export const unlocks: Unlock[] = [
  {
    key: "pastRestart",
    requirements: {
      exploration: "T2",
    },
    message: {
      priority: "alert",
      text: 'Unlock: You can change decisions you made in the past. Click a day on the timeline, then "Restart Here."',
    },
  },
  {
    key: "pastSpeed2x",
    requirements: {
      exploration: "T3",
    },
    message: {
      priority: "alert",
      text: "Speed up time for Past Barry up to 2X.",
    },
  },
  {
    key: "loop",
    requirements: {
      exploration: "S1",
    },
    message: {
      priority: "alert",
      text: "Unlock: Restart after the timeskip, but keep some of your stats and knowledge. This may have consequences.",
    },
  },
];

export const findUnlock = (key: UnlockKey) => {
  const found = unlocks.find((upgrade) => upgrade.key === key);
  if (!found) {
    throw new Error(`Could not find an unlock with key: ${key}`);
  }
  return found;
};

export const findUnlockFor = (thing: {
  upgrade?: UpgradeKey;
  exploration?: ExplorationKey;
}): Unlock | undefined => {
  for (const unlock of unlocks) {
    if (
      thing.exploration &&
      unlock.requirements.exploration === thing.exploration
    ) {
      return unlock;
    }
    if (thing.upgrade && unlock.requirements.upgrade === thing.upgrade) {
      return unlock;
    }
  }
};
