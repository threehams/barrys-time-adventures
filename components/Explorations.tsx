import {
  Exploration,
  explorations,
  findResource,
  findSkill,
} from "@laundry/store";
import { Button, Progress } from "@laundry/ui";
import { isNonNullable } from "@laundry/utils";
import { useDispatch, useSelector } from "./StateProvider";

export const Explorations = () => {
  const currentExploration = useSelector((state) => state.exploration);
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
        {availableActions.map((exploration) => {
          const currentProgress =
            playerExplorations[exploration.key]?.progress ?? 0;

          return (
            <li
              key={exploration.key}
              className="flex flex-col gap-2 p-2 mb-2 border rounded-md"
            >
              <div className="flex flex-row gap-2">
                <Button
                  disabled={phase === "traveling"}
                  onClick={() => {
                    dispatch({
                      type: "EXPLORE",
                      payload: {
                        location: exploration.key,
                      },
                    });
                  }}
                >
                  {exploration.key === currentExploration ? "Stop" : "Go"}
                </Button>
                {exploration.name}
              </div>
              <p>{exploration.description}</p>
              <div>
                <p>{formatSkills(exploration.train)}</p>
                <p>{formatDrain(exploration.drain)}</p>
              </div>
              <Progress progress={currentProgress} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const formatSkills = (drain: Exploration["train"]) => {
  const drained = Object.entries(drain)
    .map(([key, value]) => {
      if (!value) {
        return null;
      }
      return findSkill(key).name;
    })
    .filter(isNonNullable)
    .join(", ");

  return `Drains: ${drained}`;
};

const formatDrain = (drain: Exploration["drain"]) => {
  const drained = Object.entries(drain)
    .map(([key, value]) => {
      if (!value) {
        return null;
      }
      const resource = findResource(key);
      return `${resource.name} ${value}x`;
    })
    .filter(isNonNullable)
    .join(", ");

  return `Drains: ${drained}`;
};
