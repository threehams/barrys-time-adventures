import { findGarment } from "@laundry/store";
import { ClothingSlot, State } from "@laundry/store";
import { Draft } from "immer";

export const removeGarments = (state: Draft<State>, slots: ClothingSlot[]) => {
  for (const slot of slots) {
    const worn = state.wornClothing[slot];
    if (worn !== undefined) {
      const garment = findGarment(worn.key);
      const currentReuse = worn.reuse;

      for (const garmentSlot of garment.slots) {
        state.wornClothing[garmentSlot] = undefined;
      }

      state.closet[worn.key][currentReuse] =
        (state.closet[worn.key][currentReuse] ?? 0) + 1;
    }
  }
};
