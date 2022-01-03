import { findUpgrade, initialState, State, StateAction } from "@laundry/store";
import { hoursToSeconds } from "date-fns";
import { enablePatches, produceWithPatches } from "immer";
import localForage from "localforage";
import { eventHandler, updateGame } from "./gameLoop";

const VERSION = 1;
const databaseName = "reconciliation_game";
const savedGameKey = "saved_game";

localForage.config({
  version: VERSION,
  name: databaseName,
  storeName: databaseName,
});

enablePatches();
const worker = self as unknown as Worker;

const main = async () => {
  const getSavedGame = async () => {
    const savedGame = (await localForage.getItem(savedGameKey)) as State;
    return savedGame ?? initialState;
  };

  let state = await getSavedGame();
  worker.postMessage({ type: "INITIAL", payload: state });

  setInterval(() => {
    localForage.setItem(savedGameKey, state);
  }, 5000);

  worker.addEventListener("message", (message: { data: StateAction }) => {
    const action = message.data;

    const [nextState, patches] = produceWithPatches(state, (draft) => {
      if (action.type === "RESET_GAME") {
        localForage.removeItem(savedGameKey);
        return initialState;
      }
      if (action.type === "TRAVEL") {
        draft.actions = {};
        draft.resources.things = 0;
        const timeline = draft.timeline;
        draft.timeline = [];
        draft.time = 0;
        draft.phase = "preEvent";
        draft.upgrades = Object.fromEntries(
          Object.entries(draft.upgrades)
            .filter(([key]) => {
              return findUpgrade(key).phase !== "preEvent";
            })
            .map(([key, level]) => {
              return [key, level] as const;
            }),
        );
        let last = 0;
        for (const event of timeline) {
          if (
            Math.floor(event.time / hoursToSeconds(24)) >= action.payload.day
          ) {
            break;
          }
          updateGame(draft, event.time - last);
          eventHandler(draft, event.action);
          last = event.time - last;
        }
        updateGame(draft, hoursToSeconds(24) * action.payload.day - last);
        return;
      }
      return eventHandler(draft, action);
    });

    state = nextState;
    if (patches.length) {
      worker.postMessage({ type: "UPDATE", payload: patches });
    }
  });

  let previous: number | undefined = undefined;

  const loop = () => {
    const time = new Date().valueOf();
    if (previous === undefined) {
      previous = time;
    }
    const delta = time - previous;
    const [nextState, patches] = produceWithPatches(state, (draft) => {
      updateGame(draft, delta);
    });

    state = nextState;
    if (patches.length) {
      worker.postMessage({ type: "UPDATE", payload: patches });
    }

    previous = time;
    requestAnimationFrame(loop);
  };

  loop();
};

main();
