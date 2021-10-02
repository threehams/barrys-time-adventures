import { garments } from "@laundry/store";
import { Button } from "@laundry/ui";
import clsx from "clsx";
import numbro from "numbro";
import React from "react";
import { useDispatch, useSelector } from "./StateProvider";

type Props = {
  className?: string;
};
export const Shop = ({ className }: Props) => {
  const stats = useSelector((state) => state.stats);
  const dispatch = useDispatch();
  return (
    <div className={clsx("grid grid-cols-2 gap-2", className)}>
      {garments.map((garment) => {
        return (
          <Button
            onClick={() => {
              dispatch({ type: "BUY_CLOTHING", payload: { key: garment.key } });
            }}
            key={garment.key}
            disabled={stats.money < garment.cost}
          >
            {garment.name} (
            {numbro(garment.cost).formatCurrency({ thousandSeparated: true })})
          </Button>
        );
      })}
    </div>
  );
};
