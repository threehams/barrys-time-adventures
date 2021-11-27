import { WornClothing } from "@laundry/store";
import { hoursToMilliseconds } from "date-fns";

const phases = ["sleeping", "working", "gaming"] as const;
export type Phase = typeof phases[number];

export const getPhase = (time: number) => {
  const timeOfDay = time % hoursToMilliseconds(24);
  if (timeOfDay < hoursToMilliseconds(8)) {
    return "sleeping";
  } else if (timeOfDay < hoursToMilliseconds(17)) {
    return "working";
  } else if (timeOfDay < hoursToMilliseconds(24)) {
    return "gaming";
  }
  return "sleeping";
};

export const nextPhase = (time: number): Phase => {
  const phase = getPhase(time);

  return phases[phases.indexOf(phase) + 1] ?? phases[0];
};

export const readyForPhase = (phase: Phase, wornClothing: WornClothing) => {
  if (phase === "working") {
    if (wornClothing.legs === undefined || wornClothing.body === undefined) {
      return false;
    }
  }
  return true;
};
