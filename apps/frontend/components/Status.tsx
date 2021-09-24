import { useSelector } from "./StateProvider";
import { addMilliseconds, format } from "date-fns";

type Props = {
  className?: string;
};
export const Status = ({ className }: Props) => {
  const time = useSelector((state) => state.time);
  const action = useSelector((state) => state.action);
  const clothing = useSelector((state) => state.clothing);
  const timeOfDay = format(
    addMilliseconds(new Date(1980, 0, 1, 0, 0, 0), time),
    "hh:mm bb",
  );

  return (
    <div className={className}>
      <p>It is {timeOfDay}.</p>
      <p>You are {action}.</p>

      <section className="border">
        <h2>Clothing</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Clean</th>
              <th>Dirty</th>
              <th>Filthy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Shirts</td>
              <td>{clothing.shirt[0] ?? 0}</td>
              <td>{clothing.shirt[1] ?? 0}</td>
              <td>{clothing.shirt[2] ?? 0}</td>
            </tr>
            <tr>
              <td>Pants</td>
              <td>{clothing.pants[0] ?? 0}</td>
              <td>{clothing.pants[1] ?? 0}</td>
              <td>{clothing.pants[2] ?? 0}</td>
            </tr>
            <tr>
              <td>Undergarments</td>
              <td>{clothing.underpants[0] ?? 0}</td>
              <td>{clothing.underpants[1] ?? 0}</td>
              <td>{clothing.underpants[2] ?? 0}</td>
            </tr>
            <tr>
              <td>Socks</td>
              <td>{clothing.sock[0] ?? 0}</td>
              <td>{clothing.sock[1] ?? 0}</td>
              <td>{clothing.sock[2] ?? 0}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};
