import { useDispatch, useSelector } from "./StateProvider";
import React, { useMemo } from "react";
import { upgrades } from "@laundry/store";
import { Button } from "@laundry/ui";

type Props = {
  className?: string;
};
export const Upgrades = ({ className }: Props) => {
  const stats = useSelector((state) => state.stats);
  const purchasedUpgrades = useSelector((state) => state.upgrades);
  const dispatch = useDispatch();
  const availableUpgrades = useMemo(() => {
    return upgrades.filter((upgrade) => {
      return (
        stats.desperation >= upgrade.costs.desperation &&
        stats.money >= upgrade.costs.money &&
        stats.shame >= upgrade.costs.shame
      );
    });
  }, [stats.desperation, stats.money, stats.shame]);

  return (
    <section className={className}>
      <h2 className="sr-only">Upgrades</h2>
      {availableUpgrades.map((upgrade) => {
        const level = purchasedUpgrades[upgrade.key];
        const flavorText = upgrade.flavorTexts[level ?? 0];
        return (
          <div key={upgrade.key}>
            <Button
              className="mr-2"
              disabled={level === upgrade.max}
              onClick={() => {
                dispatch({
                  type: "BUY_UPGRADE",
                  payload: { key: upgrade.key },
                });
              }}
            >
              {upgrade.name}
            </Button>
            {flavorText && <span>{flavorText}</span>}
          </div>
        );
      })}
    </section>
  );
};
