import { hoursToMilliseconds } from "date-fns";
import React, { useMemo, useState } from "react";
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
import { Speedup } from "./Speedup";
import { ExplorationTabs } from "./ExplorationTabs";
import { Panel } from "./types/Panel";

export const Game = () => {
  const time = useSelector((state) => state.time);
  const phase = useSelector((state) => state.phase);
  const [panel, setPanel] = useState<Panel>("explorations");
  const [selectedUpgrade, setSelectedUpgrade] = useState<
    UpgradeKey | undefined
  >();
  const unlocks = useSelector((state) => state.unlocks);

  const layout = useMemo(() => {
    if (phase === "done") {
      return <Ending />;
    }
    return (
      <div className={clsx("relative min-h-screen", backgroundFor(phase))}>
        {phase === "event" && <Glitch />}
        {selectedUpgrade && (
          <div className="fixed z-10 w-screen h-screen bg-gray-900 opacity-70"></div>
        )}
        <div
          className={clsx(
            "px-4 grid mx-auto min-w-[1080px] max-w-[1680px] gap-3 items-start",
            "grid-rows-[auto_1fr]",
            "grid-cols-[400px_1fr_240px_auto]",
            "lg:grid-cols-[400px_1fr_240px_auto]",
          )}
          style={{
            gridTemplateAreas: `
            "timeline timeline timeline window"
            "messages main status window"
          `,
          }}
        >
          <aside className="[grid-area:status] sticky top-[0px] py-2">
            {!process.env.NEXT_PUBLIC_DISABLE_CHEATS && <Cheats />}
            <Speedup />
            <Status className="mb-3" />
            <Reset />
          </aside>
          <main className="[grid-area:main] py-2">
            {(phase === "preEvent" ||
              phase === "expand" ||
              phase === "collapse") && (
              <>
                <h2 className="mb-2">Upgrades</h2>
                <Upgrades
                  selectedUpgrade={selectedUpgrade}
                  setSelectedUpgrade={setSelectedUpgrade}
                />
              </>
            )}
            {(phase === "postEvent" || phase === "traveling") && (
              <ExplorationTabs
                key={phase}
                panel={panel}
                setPanel={setPanel}
                selectedUpgrade={selectedUpgrade}
                setSelectedUpgrade={setSelectedUpgrade}
              />
            )}
          </main>
          <Window className="[grid-area:window] my-2 h-[calc(100vh-40px)] self-stretch" />
          <div className="[grid-area:messages] sticky top-[0px] py-2">
            <Messages />
          </div>

          {unlocks.pastRestart && (
            <div
              className={clsx(
                "[grid-area:timeline]",
                selectedUpgrade && "relative z-20",
              )}
            >
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
    return "bg-gray-900 text-gray-100";
  }
  return "bg-stone-900 text-stone-100";
};
