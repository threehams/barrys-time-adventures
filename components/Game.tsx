import { Tab, Tabs } from "@laundry/ui";
import { hoursToMilliseconds } from "date-fns";
import React, { useMemo, useState } from "react";
import { Actions } from "./Actions";
import { Cheats } from "./Cheats";
import { Messages } from "./Messages";
import { Reset } from "./Reset";
import { useSelector } from "./StateProvider";
import { Status } from "./Status";
import { Timeline } from "./Timeline";
import { Upgrades } from "./Upgrades";
import { Window } from "./Window";

type Panel = "actions" | "upgrades";

export const Game = () => {
  const time = useSelector((state) => state.time);
  const phase = useSelector((state) => state.phase);
  const [panel, setPanel] = useState<Panel>("actions");

  const layout = useMemo(() => {
    return (
      <div className="relative min-h-screen bg-gray-50">
        {phase === "event" && (
          <div className="absolute z-50 flex items-center justify-center min-w-full min-h-screen text-6xl bg-gray-900 text-gray-50">
            LET&apos;S DO THE TIME WARP
          </div>
        )}
        <div
          className="grid py-4 mx-auto max-w-[1100px] grid-cols-[300px_1fr_1fr_60px] gap-3"
          style={{
            gridTemplateAreas: `
            "status main messages window"
            "timeline timeline timeline timeline"
          `,
          }}
        >
          {phase !== "preEvent" && (
            <Tabs>
              <Tab
                active={panel === "actions"}
                onClick={() => {
                  setPanel("actions");
                }}
              >
                Actions
              </Tab>
              <Tab
                active={panel === "upgrades"}
                onClick={() => {
                  setPanel("upgrades");
                }}
              >
                Upgrades
              </Tab>
            </Tabs>
          )}
          <aside className="[grid-area:status]">
            <Status className="mb-3" />
            {!process.env.NEXT_DISABLE_CHEATS && <Cheats />}
            <Reset />
          </aside>
          <main className="[grid-area:main]">
            <h2>Upgrades</h2>
            {phase === "preEvent" && <Upgrades />}
            {phase !== "preEvent" && (
              <>
                {panel === "upgrades" && <Upgrades />}
                {panel === "actions" && <Actions />}
              </>
            )}
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
  }, [panel, phase]);

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
