import { isNonNullable } from "@laundry/utils";
import { findUpgrade, Source, Upgrade, UpgradeKey } from ".";
import { State } from "./State";

const RESOURCE_GAIN_BASE_TIME = 5_000;

type ListUpgrade = {
  key: UpgradeKey;
  level: number;
  upgrade: Upgrade;
};

export const getAllUpgrades = ({
  upgrades,
  time,
  timedUpgrades,
}: Pick<State, "upgrades" | "timedUpgrades" | "time">): ListUpgrade[] => {
  return Object.entries(upgrades)
    .map(([key, value]) => {
      if (!value) {
        return null;
      }
      return { key, level: value.level, upgrade: findUpgrade(key) };
    })
    .concat(
      Object.entries(timedUpgrades).map(([key, value]) => {
        if (!value || value.time > time) {
          return null;
        }
        return { key, level: value.level, upgrade: findUpgrade(key) };
      }),
    )
    .filter(isNonNullable)
    .sort((a, b) => {
      const typeA = a.upgrade.effect.type;
      const typeB = b.upgrade.effect.type;
      if (typeA === typeB) {
        return 0;
      }
      if (typeA === "add" && typeB === "multiply") {
        return -1;
      }
      return 1;
    });
};

export const getSourceTime = (
  sourceUpgrades: ListUpgrade[],
  source: Source,
) => {
  return sourceUpgrades.reduce((acc, value) => {
    const func = value.upgrade.effect[source.resource];
    if (func && value.upgrade.effect.type === "time") {
      return Math.floor(acc * func(value.level));
    }
    return acc;
  }, RESOURCE_GAIN_BASE_TIME);
};

export const getSourceAmount = (
  sourceUpgrades: ListUpgrade[],
  source: Source,
) => {
  return sourceUpgrades.reduce((acc, value) => {
    const upgrade = value.upgrade;
    const effect = upgrade.effect[source.resource];
    if (effect && upgrade.effect.type === "add") {
      return acc + effect(value.level);
    } else if (effect && upgrade.effect.type === "multiply") {
      return acc * effect(value.level);
    }
    return acc;
  }, 0);
};