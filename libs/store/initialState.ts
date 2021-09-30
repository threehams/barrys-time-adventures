import { games, jobs } from "./data";
import { State } from "./State";

const MORNING = 60 * 60 * 8 * 1000;

export const initialState: State = {
  apartmentSpace: 700,
  closet: {
    jeans: { 0: 7 },
    tshirt: { 0: 7 },
    socks: { 0: 7 },
    briefs: { 0: 7 },
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
    legs: undefined,
    body: undefined,
    feet: undefined,
    crotch: undefined,
  },
  messages: [],
};
