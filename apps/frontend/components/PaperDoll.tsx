import { useMemo } from "react";
import { Button } from "@thing/ui";
import clsx from "clsx";
import { useDispatch, useSelector } from "./StateProvider";

type Props = {
  className?: string;
};
export const PaperDoll = ({ className }: Props) => {
  const dispatch = useDispatch();
  const clothing = useSelector((state) => state.clothing);
  const wornClothing = useSelector((state) => state.wornClothing);

  const availableClothing = useMemo(() => {
    return Object.entries(clothing).map(([name, reuses]) => {
      return [
        name,
        Object.entries(reuses)
          .map(([reuse, count = 0]) => {
            return [Number(reuse), count] as const;
          })
          .filter(([, count]) => count),
      ] as const;
    });
  }, [clothing]);

  return (
    <div className={clsx("border p-2 grid grid-cols-2 gap-2", className)}>
      {availableClothing.map(([name, reuses]) => {
        const currentReuse = wornClothing[name];
        return (
          <section key={name}>
            <h2 className="mb-1">
              Wearing: {getReuseName(currentReuse)} {name}
            </h2>

            {reuses.map(([reuse]) => {
              return (
                <Button
                  className="w-full"
                  key={reuse}
                  disabled={currentReuse === reuse}
                  onClick={() => {
                    dispatch({
                      type: "WEAR_CLOTHING",
                      payload: { key: name, reuse },
                    });
                  }}
                >
                  Wear {getReuseName(reuse)} {name}
                </Button>
              );
            })}
            <Button
              className="w-full"
              disabled={currentReuse === undefined}
              onClick={() => {
                dispatch({
                  type: "REMOVE_CLOTHING",
                  payload: { key: name },
                });
              }}
            >
              Remove {name}
            </Button>
          </section>
        );
      })}
    </div>
  );
};

const getReuseName = (reuse: number | undefined) => {
  if (reuse === undefined) {
    return "no";
  }
  if (reuse === 0) {
    return "clean";
  } else if (reuse === 1) {
    return "dirty ";
  }
  return "filthy ";
};
