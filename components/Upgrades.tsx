import { useDispatch, useSelector } from "./StateProvider";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { UpgradeKey, upgrades } from "@laundry/store";
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
  const stats = useSelector((state) => state.resources);
  const phase = useSelector((state) => state.phase);
  const purchasedUpgrades = useSelector((state) => state.upgrades);
  const dispatch = useDispatch();

  const availableUpgrades = useMemo(() => {
    return upgrades.filter((upgrade) => {
      if (
        upgrade.phase !== phase &&
        !(upgrade.phase === "postEvent" && phase === "traveling")
      ) {
        return false;
      }
      if ((upgrade.requirements.things ?? 0) > stats.things) {
        return false;
      }
      return true;
    });
  }, [phase, stats.things]);

  return (
    <section className={clsx("flex flex-col gap-2", className)}>
      <h2 className="sr-only">Upgrades</h2>
      {availableUpgrades.map((upgrade) => {
        const level = purchasedUpgrades[upgrade.key]?.level ?? 0;
        const flavorText = upgrade.flavorTexts[level];
        return (
          <div className="grid grid-cols-[auto,1fr] gap-x-2" key={upgrade.key}>
            <Button
              disabled={level === upgrade.max}
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
            <div>{upgrade.name}</div>
            {flavorText && <p className="col-start-2">{flavorText}</p>}
          </div>
        );
      })}
    </section>
  );
};
