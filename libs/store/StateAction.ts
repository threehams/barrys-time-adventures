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
type SetAutoPurchaseAction = {
  type: "SET_AUTO_PURCHASE";
  payload: {
    key: SourceKey;
    enabled: boolean;
  };
};

type SetAutoMaxLevelAction = {
  type: "SET_AUTO_MAX_LEVEL";
  payload: {
    key: UpgradeKey;
    maxLevel: number | undefined;
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
  | SetAutoPurchaseAction
  | SetAutoMaxLevelAction;
