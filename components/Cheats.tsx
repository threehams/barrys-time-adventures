import { Button } from "@laundry/ui";
import { useDispatch, useSelector } from "./StateProvider";

export const Cheats = () => {
  const dispatch = useDispatch();
  const phase = useSelector((state) => state.phase);
  return (
    <div>
      <h2>Cheats: Multiplier</h2>
      {[0, 1, 10, 100, 5000].map((multiplier) => {
        return (
          <Button
            key={multiplier}
            onClick={() => {
              dispatch({
                type: "SET_MULTIPLIER",
                payload: {
                  multiplier: multiplier * (phase === "preEvent" ? 2 : 1),
                },
              });
            }}
          >
            x{multiplier}
          </Button>
        );
      })}
    </div>
  );
};
