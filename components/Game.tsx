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
import { Phase, UpgradeKey } from "@laundry/store";
import clsx from "clsx";
import { Glitch } from "./Glitch";
import { Ending } from "./Ending";

type Panel = "explorations" | "upgrades";

export const Game = () => {
  const time = useSelector((state) => state.time);
  const phase = useSelector((state) => state.phase);
  const [panel, setPanel] = useState<Panel>("explorations");
  const [selectedUpgrade, setSelectedUpgrade] = useState<
    UpgradeKey | undefined
  >();
  const unlocks = useSelector((state) => state.unlocks);

  const layout = useMemo(() => {
    return (
      <div className={clsx("relative min-h-screen", backgroundFor(phase))}>
        {phase === "event" && <Glitch />}
        {phase === "done" && <Ending />}
        <div
          className={clsx(
            "px-4 grid py-2 mx-auto min-w-[1080px] max-w-[1680px] gap-3",
            "grid-rows-[1fr_auto]",
            "grid-cols-[400px_1fr_240px_auto]",
            "lg:grid-cols-[400px_1fr_240px_auto]",
          )}
          style={{
            gridTemplateAreas: `
            "timeline timeline timeline timeline"
            "messages main status window"
          `,
          }}
        >
          <aside className="[grid-area:status]">
            {!process.env.NEXT_PUBLIC_DISABLE_CHEATS && <Cheats />}
            <Status className="mb-3" />
            <Reset />
          </aside>
          <main className="[grid-area:main]">
            {phase === "preEvent" && (
              <>
                <h2 className="mb-2">Upgrades</h2>
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
                    Send Upgrades
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
          <Window className="[grid-area:window]" />
          <div className="[grid-area:messages]">
            <Messages />
          </div>

          {unlocks.pastRestart && (
            <div className="[grid-area:timeline]">
              <Timeline
                selectedUpgradeKey={selectedUpgrade}
                setSelectedUpgrade={setSelectedUpgrade}
              />
            </div>
          )}
        </div>
      </div>
    );
  }, [panel, phase, selectedUpgrade, unlocks.pastRestart]);

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

const backgroundFor = (phase: Phase) => {
  if (phase === "preEvent") {
    return "bg-gray-50 dark:bg-gray-900 dark:text-gray-100";
  }
  return "bg-stone-50 dark:bg-stone-900 dark:text-stone-100";
};
