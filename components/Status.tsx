import { useSelector } from "./StateProvider";
import { addMilliseconds, format, sub } from "date-fns";
import numbro from "numbro";

const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0).valueOf();
const START_DATE = sub(THE_EVENT_DATE, { days: 30 }).valueOf();
const POST_EVENT_START_DATE = new Date(2978, 1, 23, 1, 14, 0);

type Props = {
  className?: string;
};
export const Status = ({ className }: Props) => {
  const time = useSelector((state) => state.time);
  const { things, savedTime } = useSelector((state) => state.resources);
  const phase = useSelector((state) => state.phase);

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
      It is {timeOfDay}.
      <p>
        You have{" "}
        {numbro(things).format({
          thousandSeparated: true,
        })}{" "}
        things.
      </p>
      {(phase === "postEvent" || phase === "traveling") && (
        <p>You&apos;ve saved up {savedTime} time.</p>
      )}
    </div>
  );
};
