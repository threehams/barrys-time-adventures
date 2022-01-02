import { Button } from "@laundry/ui";
import { useDispatch } from "./StateProvider";

export const Cheats = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Cheats: Multiplier</h2>
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
        x1
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: "SET_MULTIPLIER",
            payload: {
              multiplier: 2,
            },
          });
        }}
      >
        x2
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: "SET_MULTIPLIER",
            payload: {
              multiplier: 5,
            },
          });
        }}
      >
        x5
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: "SET_MULTIPLIER",
            payload: {
              multiplier: 10,
            },
          });
        }}
      >
        x10
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: "SET_MULTIPLIER",
            payload: {
              multiplier: 20,
            },
          });
        }}
      >
        x20
      </Button>
    </div>
  );
};
