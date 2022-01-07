import { useDispatch, useSelector } from "./StateProvider";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import {
  canPurchaseUpgrade,
  canShowUpgrade,
  findResource,
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
  const phase = useSelector((state) => state.phase);
  const purchasedUpgrades = useSelector((state) => state.upgrades);
  const timedUpgradeMap = useSelector((state) => state.timedUpgrades);
  const playerExplorations = useSelector((state) => state.explorations);
  const dispatch = useDispatch();

  const availableUpgrades = useMemo(() => {
    return upgrades.filter((upgrade) => {
      if (
        !canShowUpgrade({
          upgrade,
          phase,
          playerExplorations,
          purchasedUpgrades,
          timedUpgrades: timedUpgradeMap,
        })
      ) {
        return false;
      }
      return true;
    });
  }, [phase, playerExplorations, purchasedUpgrades, timedUpgradeMap]);

  return (
    <section className={clsx("flex flex-col gap-2", className)}>
      {availableUpgrades.map((upgrade) => {
        const level = purchasedUpgrades[upgrade.key]?.level ?? 0;
        const flavorText = upgrade.flavorTexts[level];
        const costs = Object.entries(upgrade.costs)
          .map(([key, calc]) => {
            if (!calc) {
              return null;
            }
            const resource = findResource(key);
            return resource.format(calc(level + 1, 0));
          })
          .filter(Boolean)
          .join(", ");

        return (
          <div
            className="flex flex-wrap p-2 border rounded-sm gap-x-2"
            key={upgrade.key}
          >
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
              Buy {level > 0 && `(${level})`}
            </Button>
            <div>
              {upgrade.name} {level !== upgrade.max && `(${costs})`}
            </div>
            {level !== upgrade.max && <p>{upgrade.description}</p>}
            {flavorText && <p className="col-start-2">{flavorText}</p>}
          </div>
        );
      })}
    </section>
  );
};
