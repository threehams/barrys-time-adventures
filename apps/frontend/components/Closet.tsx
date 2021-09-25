import clsx from "clsx";
import { useSelector } from "./StateProvider";

type Props = {
  className?: string;
};
export const Closet = ({ className }: Props) => {
  const clothing = useSelector((state) => state.clothing);
  return (
    <section className={clsx("mt-4", className)}>
      <h2>Closet</h2>
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
  );
};
