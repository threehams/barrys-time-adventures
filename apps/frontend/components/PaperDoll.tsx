import { Button } from "@laundry/ui";
import clsx from "clsx";
import { useDispatch, useSelector } from "./StateProvider";
import { findGarment } from "@laundry/store";

type Props = {
  className?: string;
};
export const PaperDoll = ({ className }: Props) => {
  const dispatch = useDispatch();
  const action = useSelector((state) => state.action);
  const wornClothing = useSelector((state) => state.wornClothing);

  return (
    <div className={clsx("border p-2 grid grid-cols-1 gap-2 mx-7", className)}>
      {(["body", "legs", "crotch", "feet"] as const).map((slot) => {
        const worn = wornClothing[slot];
        const garment = worn ? findGarment(worn.key) : undefined;

        return (
          <section key={slot}>
            <h2 className="mb-1">
              Wearing: {getReuseName(worn?.reuse)} {garment?.name}
            </h2>

            <Button
              className="w-full"
              disabled={worn === undefined || action !== "idle"}
              onClick={() => {
                dispatch({
                  type: "REMOVE_CLOTHING",
                  payload: { slot },
                });
              }}
            >
              Remove {worn?.key}
            </Button>
          </section>
        );
      })}
    </div>
  );
};

const getReuseName = (reuse: number | undefined) => {
  if (reuse === undefined) {
    return "Nothing";
  }
  if (reuse === 0) {
    return "Clean";
  } else if (reuse === 1) {
    return "Dirty";
  }
  return "Filthy";
};
