import { useSelector } from "./StateProvider";
import { addMilliseconds, format, sub } from "date-fns";
import { Progress } from "@laundry/ui";
import { findResource, findSkill } from "@laundry/store";

const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0).valueOf();
const START_DATE = sub(THE_EVENT_DATE, { days: 30 }).valueOf();
const POST_EVENT_START_DATE = new Date(2978, 1, 23, 1, 14, 0);

type Props = {
  className?: string;
};
export const Status = ({ className }: Props) => {
  const time = useSelector((state) => state.time);
  const resources = useSelector((state) => state.resources);
  const phase = useSelector((state) => state.phase);
  const loops = useSelector((state) => state.loops);
  const skills = useSelector((state) => state.skills);

  const startDate =
    phase === "postEvent" || phase === "traveling"
      ? POST_EVENT_START_DATE
      : START_DATE;

  const timeOfDay = format(
    addMilliseconds(startDate, time * 1000),
    "MMMM d, yyyy hh:mm bb",
  );

  return (
    <div className={className}>
      <div className="mb-2">
        <div className="mb-2">It is {timeOfDay}.</div>
        <h2 className="font-bold">Inventory</h2>
        <ul>
          {(["food", "water", "money", "junk", "savedTime"] as const).map(
            (key) => {
              const resource = findResource(key);
              return (
                <li key={key} className="flex justify-between">
                  <span>{resource.name}</span>
                  <span>{resource.format(resources[key])}</span>
                </li>
              );
            },
          )}
        </ul>
      </div>
      {!!(phase === "postEvent" || phase === "traveling" || loops > 0) && (
        <div>
          <h2 className="font-bold">Skills</h2>
          <ul>
            {Object.entries(skills).map(([skill, value]) => {
              return (
                <li key={skill}>
                  <div className="flex justify-between">
                    <span>{findSkill(skill).name}</span>
                    <span>{Math.floor(value.current)}</span>
                  </div>

                  <Progress progress={((value.current ?? 0) * 100) % 100} />
                  <Progress
                    variant="primary"
                    progress={((value.permanent ?? 0) * 100) % 100}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
