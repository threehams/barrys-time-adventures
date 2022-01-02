type BuyUpgradeAction = { type: "BUY_UPGRADE"; payload: { key: string } };
type ResetGameAction = { type: "RESET_GAME" };
type SetMultiplier = {
  type: "SET_MULTIPLIER";
  payload: { multiplier: number };
};

export type StateAction = BuyUpgradeAction | ResetGameAction | SetMultiplier;
