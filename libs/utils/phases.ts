const phases = ["sleeping", "working", "gaming"] as const;
type Phase = typeof phases[number];

export const getPhase = (time: number) => {
  const timeOfDay = time % 86_400_000;
  if (timeOfDay < 60 * 60 * 8 * 1000) {
    return "sleeping";
  } else if (timeOfDay < 60 * 60 * 17 * 1000) {
    return "working";
  } else if (timeOfDay < 60 * 60 * 24 * 1000) {
    return "gaming";
  }
  return "sleeping";
};

export const nextPhase = (time: number): Phase => {
  const phase = getPhase(time);

  return phases[phases.indexOf(phase) + 1] ?? phases[0];
};
