import { Button } from "@laundry/ui";
import React from "react";
import { useDispatch, useSelector } from "./StateProvider";
import { getPhase, readyForPhase } from "@laundry/utils";
import { PaperDoll } from "./PaperDoll";

type Props = {
  className?: string;
};
export const Actions = ({ className }: Props) => {
  const action = useSelector((state) => state.action);
  const time = useSelector((state) => state.time);
  const wornClothing = useSelector((state) => state.wornClothing);

  const dispatch = useDispatch();
  const phase = getPhase(time);
  const ready = readyForPhase(phase, wornClothing);

  return (
    <div className={className}>
      <PaperDoll />
      <Button
        className="w-full mt-2 text-center"
        disabled={action !== "idle" || !ready}
        onClick={() => {
          dispatch({ type: "NEXT" });
        }}
      >
        {buttonText[phase]}
      </Button>
    </div>
  );
};

const buttonText = {
  sleeping: "Go to sleep",
  working: "Go to work",
  gaming: "Play a game",
};
