import React, { useMemo } from "react";
import { Actions } from "./Actions";
import { Messages } from "./Messages";
import { Reset } from "./Reset";
import { useSelector } from "./StateProvider";
import { Status } from "./Status";
import { Window } from "./Window";

export const Game = () => {
  const time = useSelector((state) => state.time);
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
            <div className="px-8 pt-4 mb-4">
              <Window />
            </div>
            <Messages />
          </aside>
        </div>
      </div>
    );
  }, []);

  return (
    <div className={time % 86_400_000 > 60 * 60 * 8 * 1000 ? "light" : "dark"}>
      {layout}
    </div>
  );
};
