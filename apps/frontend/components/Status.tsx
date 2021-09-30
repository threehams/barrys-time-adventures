// import { useSelector } from "./StateProvider";
// import { addMilliseconds, format } from "date-fns";
import { Closet } from "./Closet";

type Props = {
  className?: string;
};
export const Status = ({ className }: Props) => {
  // const time = useSelector((state) => state.time);
  // const action = useSelector((state) => state.action);
  // const timeOfDay = format(
  //   addMilliseconds(new Date(1980, 0, 1, 0, 0, 0), time),
  //   "hh:mm bb",
  // );

  return (
    <div className={className}>
      <Closet className="mt-2" />
    </div>
  );
};
