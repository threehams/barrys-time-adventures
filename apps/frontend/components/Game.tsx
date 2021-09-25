import React from "react";
import { Actions } from "./Actions";
import { Reset } from "./Reset";
import { Status } from "./Status";
import { Window } from "./Window";

export const Game = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mx-auto p-4 max-w-[1100px]">
      <main>
        <Status className="mb-3" />
        <Actions className="mb-3" />
        <Reset />
      </main>
      <aside>
        <Window />
      </aside>
    </div>
  );
};
