import { ActionKey, UpgradeKey } from ".";

type BuyUpgradeAction = { type: "BUY_UPGRADE"; payload: { key: UpgradeKey } };
type ResetGameAction = { type: "RESET_GAME" };
type SetMultiplier = {
  type: "SET_MULTIPLIER";
  payload: { multiplier: number };
};
type TravelAction = {
  type: "TRAVEL";
  payload: {
    day: number;
  };
};
type ExploreAction = {
  type: "EXPLORE";
  payload: {
    location: ActionKey;
  };
};

export type StateAction =
  | BuyUpgradeAction
  | ResetGameAction
  | SetMultiplier
  | TravelAction
  | ExploreAction;
