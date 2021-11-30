import {
  ClothingSlot,
  findGarment,
  Garment,
  WornClothing,
} from "@laundry/store";
import { Button } from "@laundry/ui";
import React from "react";
import { useDispatch, useSelector } from "./StateProvider";

export const ClosetTest = () => {
  const dispatch = useDispatch();
  const wornClothing = useSelector((state) => state.wornClothing);
  const clothingGroups = useSelector((state) => {
    const groups: (Garment | undefined)[][] = [[], [], [], []];
    Object.entries(state.closet)
      .sort((a, b) => {
        const garmentA = findGarment(a[0]);
        const garmentB = findGarment(b[0]);
        if (
          indexForSlot[garmentA.slots[0]] !== indexForSlot[garmentB.slots[0]]
        ) {
          return (
            indexForSlot[garmentA.slots[0]] - indexForSlot[garmentB.slots[0]]
          );
        }
        if (garmentA.slots.length > garmentB.slots.length) {
          return -1;
        }
        return garmentA.name.localeCompare(garmentB.name);
      })
      .forEach(([clothingKey]) => {
        const garment = findGarment(clothingKey);
        const slot = garment.slots[0];
        groups[indexForSlot[slot]].push(garment);
        if (garment.slots[1]) {
          groups[indexForSlot[garment.slots[1]]].push(undefined);
        }
      });
    return groups;
  });
  return (
    <div className="w-[600px] overflow-y-auto">
      <div className="grid auto-cols-[100px] auto-rows-[100px] gap-1 grid-flow-col">
        {clothingGroups.map((group, groupIndex) => {
          return group.map((garment, index) => {
            if (!garment) {
              return null;
            }
            return (
              <div
                key={index}
                style={{
                  gridRowStart: groupIndex + 1,
                  gridRowEnd: garment.slots.length > 1 ? "span 2" : undefined,
                  gridColumnStart: index + 1,
                }}
              >
                <Button
                  active={isClothingWorn(wornClothing, garment)}
                  className="w-full h-full"
                  onClick={() => {
                    if (isClothingWorn(wornClothing, garment)) {
                      return dispatch({
                        type: "REMOVE_CLOTHING",
                        payload: {
                          slot: garment.slots[0],
                        },
                      });
                    }
                    dispatch({
                      type: "WEAR_CLOTHING",
                      // TODO Really figure out reuse
                      payload: { key: garment.key },
                    });
                  }}
                >
                  <span className="sr-only">Wear </span>
                  {garment.name}
                </Button>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

const indexForSlot: { [Key in ClothingSlot]: number } = {
  body: 0,
  legs: 1,
  crotch: 2,
  feet: 3,
};

const isClothingWorn = (worn: WornClothing, garment: Garment) => {
  return worn[garment.slots[0]]?.key === garment.key;
};
