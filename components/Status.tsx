import { useSelector } from "./StateProvider";
import { addMilliseconds, format } from "date-fns";
import numbro from "numbro";

type Props = {
  className?: string;
};
export const Status = ({ className }: Props) => {
  const time = useSelector((state) => state.time);
  const action = useSelector((state) => state.action);
  const { money } = useSelector((state) => state.stats);

  const timeOfDay = format(
    addMilliseconds(new Date(1980, 0, 1, 0, 0, 0), time),
    "hh:mm bb",
  );

  return (
    <div className={className}>
      It is {timeOfDay}. You are {action}.{" "}
      <p>
        You have $
        {numbro(money).format({
          thousandSeparated: true,
        })}
        .
      </p>
    </div>
  );
};
