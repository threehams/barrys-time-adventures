import { useDispatch, useSelector } from "./StateProvider";
import React, { useMemo } from "react";
import { upgrades } from "@laundry/store";
import { Button } from "@laundry/ui";
import clsx from "clsx";

type Props = {
  className?: string;
};
export const Upgrades = ({ className }: Props) => {
  const stats = useSelector((state) => state.stats);
  const phase = useSelector((state) => state.phase);
  const purchasedUpgrades = useSelector((state) => state.upgrades);
  const dispatch = useDispatch();

  const availableUpgrades = useMemo(() => {
    return upgrades.filter((upgrade) => {
      if (upgrade.phase !== phase) {
        return false;
      }
      if ((upgrade.requirements ?? 0) > stats.desperation) {
        return false;
      }
      if ((upgrade.requirements.things ?? 0) > stats.things) {
        return false;
      }
      return true;
    });
  }, [phase, stats.desperation, stats.things]);

  return (
    <section className={clsx("flex flex-col gap-2", className)}>
      <h2 className="sr-only">Upgrades</h2>
      {availableUpgrades.map((upgrade) => {
        const level = purchasedUpgrades[upgrade.key] ?? 0;
        const flavorText = upgrade.flavorTexts[level];
        return (
          <div className="grid grid-cols-[auto,1fr] gap-x-2" key={upgrade.key}>
            <Button
              disabled={level === upgrade.max}
              aria-label={`Buy ${upgrade.name}`}
              onClick={() => {
                dispatch({
                  type: "BUY_UPGRADE",
                  payload: { key: upgrade.key },
                });
              }}
            >
              Buy {level > 0 && `(${level})`}
            </Button>
            <div>{upgrade.name}</div>
            {flavorText && <p className="col-start-2">{flavorText}</p>}
          </div>
        );
      })}
    </section>
  );
};
