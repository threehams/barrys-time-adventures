import { explorations } from "@laundry/store";
import { Button, Progress } from "@laundry/ui";
import { useDispatch, useSelector } from "./StateProvider";

export const Explorations = () => {
  const currentAction = useSelector((state) => state.exploration);
  const phase = useSelector((state) => state.phase);
  const playerExplorations = useSelector((state) => state.explorations);
  const dispatch = useDispatch();

  const availableActions = explorations.filter((action) => {
    if (playerExplorations[action.key]?.progress === 100) {
      return false;
    }
    if (!action.requirements.action) {
      return true;
    }
    return playerExplorations[action.requirements.action]?.progress === 100;
  });

  return (
    <div>
      <ul>
        {availableActions.map((action) => {
          const currentProgress = playerExplorations[action.key]?.progress ?? 0;

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
              <p>{action.description}</p>
              <Progress progress={currentProgress} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
