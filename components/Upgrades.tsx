import { useDispatch, useSelector } from "./StateProvider";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import {
  canPurchaseUpgrade,
  canShowUpgrade,
  findResource,
  Resource,
  sources,
  Upgrade,
  UpgradeKey,
  upgrades,
} from "@laundry/store";
import { Button } from "@laundry/ui";
import clsx from "clsx";

type Props = {
  className?: string;
  selectedUpgrade: UpgradeKey | undefined;
  setSelectedUpgrade: Dispatch<SetStateAction<UpgradeKey | undefined>>;
};
export const Upgrades = ({
  className,
  selectedUpgrade,
  setSelectedUpgrade,
}: Props) => {
  const resources = useSelector((state) => state.resources);
  const unlocks = useSelector((state) => state.unlocks);
  const autoUpgrade = useSelector((state) => state.autoUpgrade);
  const maxResources = useSelector((state) => state.maxResources);
  const phase = useSelector((state) => state.phase);
  const purchasedUpgrades = useSelector((state) => state.upgrades);
  const timedUpgradeMap = useSelector((state) => state.timedUpgrades);
  const playerExplorations = useSelector((state) => state.explorations);
  const dispatch = useDispatch();

  const sourceUpgrades = useMemo(() => {
    return sources.map((source) => {
      const available = upgrades.filter((upgrade) => {
        if (upgrade.source !== source.key) {
          return false;
        }
        if (
          !canShowUpgrade({
            upgrade,
            phase,
            playerExplorations,
            purchasedUpgrades,
            timedUpgrades: timedUpgradeMap,
            resources,
            maxResources,
          })
        ) {
          return false;
        }
        return true;
      });
      return { source, available };
    });
  }, [
    maxResources,
    phase,
    playerExplorations,
    purchasedUpgrades,
    resources,
    timedUpgradeMap,
  ]);

  return (
    <ul className={clsx("flex flex-col gap-2", className)}>
      {sourceUpgrades.map((value) => {
        const resourceGroup = findResource(value.source.resource);
        if (
          !value.available.length &&
          !(unlocks.autoPurchase && phase === "preEvent")
        ) {
          return null;
        }

        return (
          <li key={value.source.key}>
            <div className="flex items-center gap-2 mb-1">
              {unlocks.autoPurchase && phase === "preEvent" && (
                <Button
                  active={autoUpgrade[value.source.key]}
                  onClick={() => {
                    dispatch({
                      type: "TOGGLE_AUTO_PURCHASE",
                      payload: {
                        key: value.source.key,
                      },
                    });
                  }}
                >
                  Auto
                </Button>
              )}
              <h2>
                {resourceGroup.name}: {value.source.name}
              </h2>
            </div>

            <ul className={clsx("flex flex-col gap-2", className)}>
              {value.available.map((upgrade) => {
                const level = purchasedUpgrades[upgrade.key]?.level ?? 0;
                const flavorText = upgrade.flavorTexts[level];
                const costs = Object.entries(upgrade.costs)
                  .map(([key, calc]) => {
                    if (!calc) {
                      return null;
                    }
                    const resource = findResource(key);
                    return resource.formatWithType(calc(level + 1, 0));
                  })
                  .filter(Boolean)
                  .join(", ");

                return (
                  <li
                    className="flex flex-col p-2 border rounded-sm gap-x-2"
                    key={upgrade.key}
                  >
                    <div className="flex flex-row gap-2">
                      <Button
                        disabled={
                          !canPurchaseUpgrade({
                            upgrade,
                            phase,
                            playerExplorations,
                            purchasedUpgrades,
                            timedUpgrades: timedUpgradeMap,
                            distance: 0,
                            resources,
                            maxResources,
                          })
                        }
                        aria-label={`Buy ${upgrade.name}`}
                        active={selectedUpgrade === upgrade.key}
                        onClick={() => {
                          if (upgrade.phase === "postEvent") {
                            setSelectedUpgrade((current) =>
                              current === upgrade.key ? undefined : upgrade.key,
                            );
                            return;
                          }
                          dispatch({
                            type: "BUY_UPGRADE",
                            payload: { key: upgrade.key },
                          });
                        }}
                      >
                        Buy{" "}
                        {level > 0 &&
                          `(${level !== upgrade.max ? level : "MAX"})`}
                      </Button>
                      <div>
                        {upgrade.name} {level !== upgrade.max && `(${costs})`}
                      </div>
                    </div>
                    {level !== upgrade.max && (
                      <>
                        <p>{upgradeEffect(upgrade, level)}</p>
                        <p>{upgrade.description}</p>
                      </>
                    )}
                    {flavorText && <p className="col-start-2">{flavorText}</p>}
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

const upgradeEffect = (upgrade: Upgrade, currentLevel: number) => {
  if (currentLevel + 1 > upgrade.max) {
    return "";
  }
  const [resourceKey, resourceFunc] = Object.entries(upgrade.effect).find(
    ([key, func]) => {
      return key !== "type" && !!func;
    },
  )! as [Resource, (level: number) => number];
  const resource = findResource(resourceKey);
  const diff = resourceFunc(currentLevel + 1) - resourceFunc(currentLevel);
  if (upgrade.effect.type === "add") {
    return `+${Math.floor(diff)} ${resource.name} gain`;
  } else if (upgrade.effect.type === "multiply") {
    return `+${diff.toFixed(2)}x ${resource.name} gain`;
  } else {
    return `+${Math.abs(diff).toFixed(2)}x ${resource.name} speed`;
  }
};
