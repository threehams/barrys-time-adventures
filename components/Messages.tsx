import clsx from "clsx";
import { useSelector } from "./StateProvider";

export const Messages = () => {
  const messages = useSelector((state) => state.messages)
    .slice()
    .reverse();

  return (
    <div className="w-full p-4 space-y-2 text-gray-300 border">
      {messages.map((message, index) => {
        return (
          <p
            key={index}
            className={clsx(
              "relative",
              index === 1 && "text-gray-500",
              index === 0 && "text-gray-900",
            )}
          >
            <span className="absolute top-[0] bottom-[0] left-[0] w-1 bg-gray-300"></span>
            <span className="block pl-3">{message}</span>
          </p>
        );
      })}
    </div>
  );
};
