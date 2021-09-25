import { StateAction, State } from "@thing/store";
import { enablePatches, produceWithPatches } from "immer";
import { games } from "libs/data/games";
import { jobs } from "libs/data/jobs";
import localForage from "localforage";
import { eventHandler, gameLoop } from "./gameLoop";

const VERSION = 1;

const databaseName = "laundry_game";
const savedGameKey = "saved_game";

localForage.config({
  version: VERSION,
  name: databaseName,
  storeName: databaseName,
});

enablePatches();
const worker = self as unknown as Worker;
const MORNING = 60 * 60 * 8 * 1000;

const initialState: State = {
  apartmentSpace: 700,
  clothing: {
    pants: { 0: 7 },
    shirt: { 0: 7 },
    sock: { 0: 7 },
    underpants: { 0: 7 },
  },
  game: games[0],
  desperation: 0,
  job: jobs[0],
  money: 10,
  shame: 0,
  time: MORNING,
  upgrades: {},
  action: "idle",
  wornClothing: {
    pants: undefined,
    shirt: undefined,
    sock: undefined,
    underpants: undefined,
  },
  messages: [],
};

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

  worker.addEventListener("message", (event: { data: StateAction }) => {
    const action = event.data;

    const [nextState, patches] = produceWithPatches(state, (draft) => {
      if (action.type === "RESET_GAME") {
        localForage.removeItem(savedGameKey);
        return initialState;
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
      gameLoop(draft, delta);
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
