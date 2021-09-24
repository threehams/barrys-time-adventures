import { Button } from "@thing/ui";
import React from "react";
import { useDispatch, useSelector } from "./StateProvider";
import { getPhase } from "@thing/utils";

export const Actions = () => {
  const action = useSelector((state) => state.action);
  const time = useSelector((state) => state.time);

  const dispatch = useDispatch();
  const phase = getPhase(time);

  return (
    <Button
      disabled={action !== "idle"}
      onClick={() => {
        dispatch({ type: "NEXT" });
      }}
    >
      {buttonText[phase]}
    </Button>
  );
};

const buttonText = {
  sleeping: "Go to sleep",
  working: "Go to work",
  gaming: "Play a game",
};
