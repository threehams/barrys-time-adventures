import { Tab, Tabs } from "@laundry/ui";
import React, { useMemo, useState } from "react";
import { Actions } from "./Actions";
import { Messages } from "./Messages";
import { Reset } from "./Reset";
import { useSelector } from "./StateProvider";
import { Status } from "./Status";
import { Upgrades } from "./Upgrades";
import { Window } from "./Window";
import { Shop } from "./Shop";
import { hoursToMilliseconds } from "date-fns";
import { ClosetMode } from "./types/Mode";
import clsx from "clsx";
import { ClosetTest } from "./ClosetTest";

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
          <aside className="w-[600px]">
            <Tabs>
              <Tab
                active={panel === "window"}
                onClick={() => setPanel("window")}
              >
                Look Outside
              </Tab>
              <Tab
                active={panel === "closet"}
                onClick={() => setPanel("closet")}
              >
                Closet
              </Tab>
              <Tab
                active={panel === "upgrades"}
                onClick={() => setPanel("upgrades")}
              >
                Upgrades
              </Tab>
              {canShop && (
                <Tab active={panel === "shop"} onClick={() => setPanel("shop")}>
                  Shop
                </Tab>
              )}
            </Tabs>
            <div className="grid">
              <div
                className={clsx(
                  "p-4 col-start-1 row-start-1 relative z-10",
                  panel !== "window" && "backdrop-blur-lg",
                )}
              >
                {panel === "closet" && (
                  // <Closet
                  //   closetMode={closetMode}
                  //   setClosetMode={setClosetMode}
                  // />
                  <ClosetTest />
                )}
                {panel === "upgrades" && <Upgrades />}
                {panel === "shop" && <Shop />}
              </div>
              <Window
                className={clsx(
                  "mx-auto mt-6 max-w-[400px] col-start-1 row-start-1",
                  panel !== "window" && "opacity-20",
                )}
              />
            </div>
            <Messages />
          </aside>
        </div>
      </div>
    );
  }, [canShop, panel]);

  return (
    <div
      className={
        time % hoursToMilliseconds(24) > hoursToMilliseconds(8)
          ? "light"
          : "dark"
      }
    >
      {layout}
    </div>
  );
};
