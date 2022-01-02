import { Tab, Tabs } from "@laundry/ui";
import { hoursToMilliseconds } from "date-fns";
import React, { useMemo, useState } from "react";
import { Messages } from "./Messages";
import { Reset } from "./Reset";
import { useSelector } from "./StateProvider";
import { Status } from "./Status";
import { Timeline } from "./Timeline";
import { Upgrades } from "./Upgrades";
import { Window } from "./Window";

type Panel = "upgrades" | "shop";

export const Game = () => {
  const time = useSelector((state) => state.time);
  const canShop = useSelector((state) => state.upgrades.buyClothes);
  const [panel, setPanel] = useState<Panel>("upgrades");

  const layout = useMemo(() => {
    return (
      <div className="min-h-screen bg-gray-50">
        <div
          className="grid py-4 mx-auto max-w-[1100px] grid-cols-[400px_1fr_60px]"
          style={{
            gridTemplateAreas: `
            "status main window"
            "timeline timeline timeline"
            "messages messages messages"
          `,
          }}
        >
          <aside className="[grid-area:status]">
            <Status className="mb-3" />
            <Reset />
          </aside>
          <main className="[grid-area:main]">
            <Tabs>
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
              <div className="relative z-10 p-4">
                {panel === "upgrades" && <Upgrades />}
              </div>
            </div>
          </main>
          <Window className="[grid-area:window] " />
          <div className="[grid-area:messages]">
            <Messages />
          </div>
          <div className="[grid-area:timeline]">
            <Timeline />
          </div>
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
