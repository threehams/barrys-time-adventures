import { useDispatch, useSelector } from "./StateProvider";
import { Button, Tab, Tabs } from "@laundry/ui";
import React from "react";
import { ClothingSlot, findGarment, findUnlock } from "@laundry/store";
import { ClosetMode } from "./types/Mode";
import clsx from "clsx";

type Props = {
  className?: string;
  closetMode: ClosetMode;
  setClosetMode: (mode: ClosetMode) => void;
};
export const Closet = ({
  className,
  closetMode: mode,
  setClosetMode: setMode,
}: Props) => {
  const closet = useSelector((state) => state.closet);
  const autoUnlocked = useSelector(
    (state) => !!state.upgrades[findUnlock("autoClothes").key],
  );
  const wornClothing = useSelector((state) => state.wornClothing);
  const dispatch = useDispatch();

  return (
    <section className={className}>
      <h2 className="sr-only">Closet</h2>
      {autoUnlocked && (
        <Tabs>
          <Tab onClick={() => setMode("wear")} active={mode === "wear"}>
            Wear
          </Tab>
          <Tab onClick={() => setMode("plan")} active={mode === "plan"}>
            Plan
          </Tab>
        </Tabs>
      )}
      <div
        className="grid grid-rows-4 gap-1 overflow-y-auto auto-cols-[100px] grid-flow-col"
        style={{ gridTemplateColumns: "repeat(100px)" }}
      >
        {Object.entries(closet).map(([key, reuseMap]) => {
          const garment = findGarment(key);
          const worn = wornClothing[garment.slots[0]];
          const found = Object.keys(reuseMap).find((reuse) => {
            return !!reuseMap[reuse];
          });
          const firstReuse = found === undefined ? undefined : Number(found);

          return (
            <Button
              className={clsx(
                "w-[100px] h-[100px]",
                getSlotClass(garment.slots),
              )}
              aria-label={`Wear ${garment.name}`}
              key={garment.key}
              disabled={false}
              onClick={() => {
                if (firstReuse !== undefined) {
                  dispatch({
                    type: "WEAR_CLOTHING",
                    payload: { key, reuse: firstReuse },
                  });
                }
              }}
            >
              <span className="sr-only">Wear </span>
              <span className="text-sm">{garment.name}</span>
            </Button>
          );
        })}
      </div>
    </section>
  );
};

const getSlotClass = (slots: ClothingSlot[]) => {
  if (slots.length === 1) {
    return slotRows[slots[0]];
  }
  if (slots.length === 2 && slots[0] === "body" && slots[1] === "legs") {
    return "col-start-1 row-start-[span_2]";
  }
  return "";
};

const slotRows: { [Key in ClothingSlot]: string } = {
  body: "row-start-1",
  legs: "row-start-2",
  crotch: "row-start-3",
  feet: "row-start-4",
};

const slotSpans: { [key: number]: string | undefined } = {
  2: "",
};
