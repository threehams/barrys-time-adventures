import { Tab, Tabs } from "@laundry/ui";
import { hoursToMilliseconds } from "date-fns";
import React, { useMemo, useState } from "react";
import { Explorations } from "./Explorations";
import { Cheats } from "./Cheats";
import { Messages } from "./Messages";
import { Reset } from "./Reset";
import { useSelector } from "./StateProvider";
import { Status } from "./Status";
import { Timeline } from "./Timeline";
import { Upgrades } from "./Upgrades";
import { Window } from "./Window";
import { UpgradeKey } from "@laundry/store";
import clsx from "clsx";

type Panel = "explorations" | "upgrades";

export const Game = () => {
  const time = useSelector((state) => state.time);
  const phase = useSelector((state) => state.phase);
  const [panel, setPanel] = useState<Panel>("explorations");
  const [selectedUpgrade, setSelectedUpgrade] = useState<
    UpgradeKey | undefined
  >();

  const layout = useMemo(() => {
    return (
      <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
        {phase === "event" && (
          <div className="absolute z-50 flex items-center justify-center min-w-full min-h-screen text-6xl bg-gray-900 text-gray-50">
            LET&apos;S DO THE TIME WARP
          </div>
        )}
        <div
          className={clsx(
            "px-4 grid py-4 mx-auto min-w-[1080px] max-w-[1680px] h-screen gap-3",
            "grid-rows-[1fr_auto]",
            "grid-cols-[400px_1fr_240px_auto]",
            "lg:grid-cols-[400px_1fr_240px_auto]",
          )}
          style={{
            gridTemplateAreas: `
            "messages main status window"
            "timeline timeline timeline timeline"
          `,
          }}
        >
          <aside className="[grid-area:status]">
            <Status className="mb-3" />
            {!process.env.NEXT_PUBLIC_DISABLE_CHEATS && <Cheats />}
            <Reset />
          </aside>
          <main className="[grid-area:main]">
            {phase === "preEvent" && (
              <>
                <h2>Upgrades</h2>
                <Upgrades
                  selectedUpgrade={selectedUpgrade}
                  setSelectedUpgrade={setSelectedUpgrade}
                />
              </>
            )}
            {phase !== "preEvent" && (
              <div>
                <Tabs className="mb-2">
                  <Tab
                    active={panel === "explorations"}
                    onClick={() => {
                      setPanel("explorations");
                    }}
                  >
                    Exploration
                  </Tab>
                  <Tab
                    active={panel === "upgrades"}
                    onClick={() => {
                      setPanel("upgrades");
                    }}
                  >
                    Time Travel
                  </Tab>
                </Tabs>
                {panel === "upgrades" && (
                  <Upgrades
                    selectedUpgrade={selectedUpgrade}
                    setSelectedUpgrade={setSelectedUpgrade}
                  />
                )}
                {panel === "explorations" && <Explorations />}
              </div>
            )}
          </main>
          <Window className="[grid-area:window] " />
          <div className="[grid-area:messages]  p-4 text-gray-300 border rounded-md">
            <Messages />
          </div>

          <div className="[grid-area:timeline]">
            <Timeline
              selectedUpgradeKey={selectedUpgrade}
              setSelectedUpgrade={setSelectedUpgrade}
            />
          </div>
        </div>
      </div>
    );
  }, [panel, phase, selectedUpgrade]);

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
