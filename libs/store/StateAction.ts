import { ExplorationKey, SourceKey, UpgradeKey } from ".";

type BuyUpgradeAction = { type: "BUY_UPGRADE"; payload: { key: UpgradeKey } };
type BuyTimedUpgradeAction = {
  type: "BUY_TIMED_UPGRADE";
  payload: {
    key: UpgradeKey;
    day: number;
  };
};
type ResetGameAction = { type: "RESET_GAME" };
type SetMultiplier = {
  type: "SET_MULTIPLIER";
  payload: {
    multiplier: number;
  };
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
    location: ExplorationKey;
  };
};
type LoopAction = {
  type: "LOOP";
};
type ToggleAutoPurchaseAction = {
  type: "TOGGLE_AUTO_PURCHASE";
  payload: {
    key: SourceKey;
  };
};

export type StateAction =
  | BuyUpgradeAction
  | BuyTimedUpgradeAction
  | ResetGameAction
  | SetMultiplier
  | TravelAction
  | ExploreAction
  | LoopAction
  | ToggleAutoPurchaseAction;
