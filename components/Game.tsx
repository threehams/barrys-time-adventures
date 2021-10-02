import { Button } from "@laundry/ui";
import React, { useMemo, useState } from "react";
import { Actions } from "./Actions";
import { Closet } from "./Closet";
import { Messages } from "./Messages";
import { Reset } from "./Reset";
import { useSelector } from "./StateProvider";
import { Status } from "./Status";
import { Upgrades } from "./Upgrades";
import { Window } from "./Window";
import { Shop } from "./Shop";

type Panel = "window" | "closet" | "upgrades" | "shop";

export const Game = () => {
  const time = useSelector((state) => state.time);
  const canShop = useSelector((state) => state.upgrades.buyClothes);
  const [panel, setPanel] = useState<Panel>("window");
  const layout = useMemo(() => {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-row flex-nowrap gap-7 mx-auto p-4 max-w-[1100px]">
          <main className="flex-grow flex-shrink-0">
            <Status className="mb-3" />
            <Actions className="mb-3" />
            <Reset />
          </main>
          <aside className="w-[600px] self-center">
            <Button
              disabled={panel === "window"}
              onClick={() => setPanel("window")}
            >
              Outside
            </Button>
            <Button
              disabled={panel === "closet"}
              onClick={() => setPanel("closet")}
            >
              Closet
            </Button>
            <Button
              disabled={panel === "upgrades"}
              onClick={() => setPanel("upgrades")}
            >
              Upgrades
            </Button>
            {canShop && (
              <Button
                disabled={panel === "shop"}
                onClick={() => setPanel("shop")}
              >
                Shop
              </Button>
            )}
            <div className="relative px-8 pt-4 mb-4">
              <Window />
              <div className="absolute top-0 left-0 w-full h-full pt-4">
                {panel === "closet" && <Closet />}
                {panel === "upgrades" && <Upgrades />}
                {panel === "shop" && <Shop />}
              </div>
            </div>
            <Messages />
          </aside>
        </div>
      </div>
    );
  }, [canShop, panel]);

  return (
    <div className={time % 86_400_000 > 60 * 60 * 8 * 1000 ? "light" : "dark"}>
      {layout}
    </div>
  );
};
