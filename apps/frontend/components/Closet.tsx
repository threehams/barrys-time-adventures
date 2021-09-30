import clsx from "clsx";
import { useDispatch, useSelector } from "./StateProvider";
import { Button } from "@laundry/ui";
import React from "react";
import { findGarment } from "@laundry/store";

type Props = {
  className?: string;
};
export const Closet = ({ className }: Props) => {
  const closet = useSelector((state) => state.closet);
  const wornClothing = useSelector((state) => state.wornClothing);
  const dispatch = useDispatch();

  return (
    <section className={clsx("mt-4", className)}>
      <h2 className="sr-only">Closet</h2>
      <div className="grid grid-cols-4 gap-1">
        {Object.entries(closet).map(([key, reuseMap]) => {
          const garment = findGarment(key);
          const worn = wornClothing[garment.slots[0]];

          return (
            <React.Fragment key={key}>
              <h2>{garment.name}</h2>
              {range(0, 3).map((reuseNum) => {
                const alreadyWorn =
                  worn && worn.key === key && worn.reuse === reuseNum;
                return (
                  <Button
                    aria-label={`Wear ${getReuseName(reuseNum)} ${
                      garment.name
                    }`}
                    key={reuseNum}
                    disabled={!reuseMap[reuseNum] || alreadyWorn}
                    onClick={() => {
                      if (reuseMap[reuseNum]) {
                        dispatch({
                          type: "WEAR_CLOTHING",
                          payload: { key, reuse: reuseNum },
                        });
                      }
                    }}
                  >
                    {getReuseName(reuseNum)} {reuseMap[reuseNum] ?? 0}
                  </Button>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

const range = (start: number, end: number) => {
  return Array.from(Array(end).keys()).map((num) => num + start);
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
