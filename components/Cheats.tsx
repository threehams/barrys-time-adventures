import { Button } from "@laundry/ui";
import { useDispatch } from "./StateProvider";

export const Cheats = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Cheats: Multiplier</h2>
      {[1, 10, 100, 5000].map((multiplier) => {
        return (
          <Button
            key={multiplier}
            onClick={() => {
              dispatch({
                type: "SET_MULTIPLIER",
                payload: {
                  multiplier,
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
