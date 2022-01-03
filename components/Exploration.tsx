import { gameActions } from "@laundry/store";
import { Button } from "@laundry/ui";
import clsx from "clsx";
import { useDispatch, useSelector } from "./StateProvider";

export const Exploration = () => {
  const currentAction = useSelector((state) => state.action);
  const phase = useSelector((state) => state.phase);
  const completedActions = useSelector((state) => state.actions);
  const dispatch = useDispatch();

  const availableActions = gameActions.filter((action) => {
    if (completedActions[action.key] === 100) {
      return false;
    }
    if (!action.requirements.action) {
      return true;
    }
    return completedActions[action.requirements.action] === 100;
  });

  return (
    <div>
      <ul>
        {availableActions.map((action) => {
          const progress = completedActions[action.key];
          return (
            <li key={action.key}>
              <Button
                className="mb-1 mr-1"
                disabled={phase === "traveling"}
                onClick={() => {
                  dispatch({
                    type: "EXPLORE",
                    payload: {
                      location: action.key,
                    },
                  });
                }}
              >
                {action.key === currentAction ? "Stop" : "Go"}
              </Button>
              {action.name}
              <div
                className="w-full h-1 origin-left bg-blue-700"
                style={{ transform: `scaleX(${progress || 0}%)` }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
