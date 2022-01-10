import { ExplorationKey } from "./data/explorations";
import { UnlockKey } from "./data/unlocks";
import { UpgradeKey } from "./data/upgrades";
import { Resource, Resources, SourceKey } from "./Resources";
import { Skills } from "./Skills";
import { StateAction } from "./StateAction";

export type Phase = "preEvent" | "event" | "postEvent" | "traveling" | "done";
export type PurchasedUpgrades = {
  [Key in UpgradeKey]?: { level: number };
};
export type PurchasedTimedUpgrades = {
  [Key in UpgradeKey]?: { level: number; time: number };
};
export type PlayerExplorations = {
  [Key in ExplorationKey]?: {
    progress: number;
  };
};
export type Unlocks = {
  [Key in UnlockKey]?: boolean;
};
export type MessageLevel = "info" | "alert";
export type Message = { text: string; priority: MessageLevel };
export type State = {
  unlocks: Unlocks;
  phase: Phase;
  exploration: ExplorationKey | undefined;
  time: number;
  messages: ReadonlyArray<Message>;
  resources: Resources;
  maxResources: Resources;
  skills: Skills;
  explorations: PlayerExplorations;
  upgrades: PurchasedUpgrades;
  timedUpgrades: PurchasedTimedUpgrades;
  timeline: ReadonlyArray<{
    time: number;
    action: StateAction;
  }>;
  multiplier: number;
  timers: {
    [Key in SourceKey | "event" | "action" | Resource]: number;
  };
  loops: number;
};
