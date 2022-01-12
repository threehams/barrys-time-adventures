import { UnlockKey } from "@laundry/store";
import { Button } from "@laundry/ui";
import { useDispatch, useSelector } from "./StateProvider";

export const Speedup = () => {
  const unlocks = useSelector((state) => state.unlocks);
  const dispatch = useDispatch();

  const multipliers = Object.entries(unlocks)
    .filter(([key, value]) => {
      return value && !!speeds[key];
    })
    .map(([key]) => {
      return speeds[key] as number;
    });

  if (!multipliers.length) {
    return null;
  }

  return (
    <ul>
      <li>
        <Button
          onClick={() => {
            dispatch({
              type: "SET_MULTIPLIER",
              payload: {
                multiplier: 1,
              },
            });
          }}
        >
          1X
        </Button>
        {multipliers.map((multiplier) => {
          <Button
            onClick={() => {
              dispatch({
                type: "SET_MULTIPLIER",
                payload: {
                  multiplier,
                },
              });
            }}
          >
            X{multiplier}
          </Button>;
        })}
      </li>
    </ul>
  );
};

const speeds: { [Key in UnlockKey]?: number } = {
  pastSpeed2x: 2,
};
