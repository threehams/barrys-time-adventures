import { useSelector } from "./StateProvider";

export const Glitch = () => {
  const time = useSelector((state) => state.timers.event);

  return (
    <div className="absolute z-50 flex items-center justify-center min-w-full min-h-screen text-6xl bg-gray-900 text-gray-50">
      TIMESKIP ({time})
    </div>
  );
};
