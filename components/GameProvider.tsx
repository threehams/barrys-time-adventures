import React from "react";
import { useWorker } from "@laundry/worker";
import { DispatchProvider, StateProvider } from "./StateProvider";
import { Game } from "./Game";
import { useRouter } from "next/router";
import { ErrorBoundary } from "react-error-boundary";
import { Reset } from "./Reset";

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
      <DispatchProvider value={dispatch}>
        <ErrorBoundary FallbackComponent={ErrorReset}>{children}</ErrorBoundary>
      </DispatchProvider>
      {!process.env.NEXT_PUBLIC_DISABLE_CHEATS &&
        router.query.debug !== undefined && (
          <pre>{JSON.stringify(state, null, 2)}</pre>
        )}
    </StateProvider>
  );
};

const ErrorReset = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-1 text-center">
      Game crashes, likely an out-of-date save game. Save game migration is not
      yet in place. Reset your game for now, then reload the page.
      <Reset />
    </div>
  );
};
