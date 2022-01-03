import { useSelector } from "./StateProvider";
import { addMilliseconds, format, sub } from "date-fns";
import numbro from "numbro";
import { Progress } from "@laundry/ui";

const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0).valueOf();
const START_DATE = sub(THE_EVENT_DATE, { days: 30 }).valueOf();
const POST_EVENT_START_DATE = new Date(2978, 1, 23, 1, 14, 0);

type Props = {
  className?: string;
};
export const Status = ({ className }: Props) => {
  const time = useSelector((state) => state.time);
  const { food, savedTime } = useSelector((state) => state.resources);
  const phase = useSelector((state) => state.phase);
  const loops = useSelector((state) => state.loops);
  const stats = useSelector((state) => state.stats);

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
      <div>
        It is {timeOfDay}.
        <p>
          You have{" "}
          {numbro(food).format({
            thousandSeparated: true,
          })}{" "}
          food.
        </p>
        {(phase === "postEvent" || phase === "traveling") && (
          <p>You&apos;ve saved up {savedTime} time.</p>
        )}
      </div>
      {!!(phase === "postEvent" || phase === "traveling" || loops > 0) && (
        <div>
          <h2>Stats</h2>
          <ul>
            {Object.entries(stats).map(([stat, value]) => {
              return (
                <li key={stat}>
                  {stat}: {Math.floor(value.current)}
                  <Progress progress={((value.current ?? 0) * 100) % 100} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
