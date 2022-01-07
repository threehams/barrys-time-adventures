import React from "react";
import { useWorker } from "@laundry/worker";
import { DispatchProvider, StateProvider } from "./StateProvider";
import { Game } from "./Game";
import { useRouter } from "next/router";

const children = <Game />;

export const GameProvider = () => {
  const { state, dispatch } = useWorker();
  const router = useRouter();

  if (!state) {
    return (
      <div className="flex items-center justify-center min-w-full min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <StateProvider value={state}>
      <DispatchProvider value={dispatch}>{children}</DispatchProvider>
      {!process.env.NEXT_PUBLIC_DISABLE_CHEATS &&
        router.query.debug !== undefined && (
          <pre>{JSON.stringify(state, null, 2)}</pre>
        )}
    </StateProvider>
  );
};
