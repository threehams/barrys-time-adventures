import { reuseUpgrades, unlockUpgrades, storageUpgrades } from ".";
import { UpgradeKey } from "..";

export const upgrades = [
  ...reuseUpgrades,
  ...storageUpgrades,
  ...unlockUpgrades,
];

export const findUpgrade = (key: UpgradeKey) => {
  const found = upgrades.find((upgrade) => upgrade.key === key);
  if (!found) {
    throw new Error(`Could not find an upgrade with key: ${key}`);
  }
  return found;
};
