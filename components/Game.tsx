import { hoursToMilliseconds } from "date-fns";
import React, { useMemo } from "react";
import { Cheats } from "./Cheats";
import { Messages } from "./Messages";
import { Reset } from "./Reset";
import { useSelector } from "./StateProvider";
import { Status } from "./Status";
import { Timeline } from "./Timeline";
import { Upgrades } from "./Upgrades";
import { Window } from "./Window";

export const Game = () => {
  const time = useSelector((state) => state.time);
  const phase = useSelector((state) => state.phase);
  const loops = useSelector((state) => state.loops);

  const layout = useMemo(() => {
    return (
      <div className="relative min-h-screen bg-gray-50">
        {phase === "event" && (
          <div className="absolute z-50 flex items-center justify-center min-w-full min-h-screen text-6xl bg-gray-900 text-gray-50">
            JUDGEMENT DAY HAS COME
          </div>
        )}
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
            {!process.env.NEXT_DIASBLE_CHEATS && <Cheats />}
            <Reset />
          </aside>
          <main className="[grid-area:main]">
            <h2>Upgrades</h2>
            <Upgrades />
          </main>
          <Window className="[grid-area:window] " />
          <div className="[grid-area:messages]">
            <Messages />
          </div>
          {loops > 0 && (
            <div className="[grid-area:timeline]">
              <Timeline />
            </div>
          )}
        </div>
      </div>
    );
  }, [loops, phase]);

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
