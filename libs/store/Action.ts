type BuyUpgradeAction = { type: "BUY_UPGRADE"; payload: { key: string } };
type BuyGameAction = { type: "BUY_GAME"; payload: { key: string } };
type NextAction = { type: "NEXT" };
type ResetGameAction = { type: "RESET_GAME" };

export type StateAction =
  | BuyUpgradeAction
  | BuyGameAction
  | NextAction
  | ResetGameAction;
