import { useSelector } from "./StateProvider";
import { addMilliseconds, format } from "date-fns";
import numbro from "numbro";

type Props = {
  className?: string;
};
export const Status = ({ className }: Props) => {
  const time = useSelector((state) => state.time);
  const things = useSelector((state) => state.things);

  const timeOfDay = format(
    addMilliseconds(new Date(1997, 6, 29, 8, 0, 0), time),
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
