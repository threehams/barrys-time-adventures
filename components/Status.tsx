import { useSelector } from "./StateProvider";
import { addMilliseconds, format, sub } from "date-fns";
import numbro from "numbro";

const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0);
const START_DATE = sub(THE_EVENT_DATE, { days: 30 });

type Props = {
  className?: string;
};
export const Status = ({ className }: Props) => {
  const time = useSelector((state) => state.time);
  const things = useSelector((state) => state.things);

  const timeOfDay = format(
    addMilliseconds(START_DATE, time),
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
    </div>
  );
};
