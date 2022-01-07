import clsx from "clsx";
import { useSelector } from "./StateProvider";

export const Messages = () => {
  const messages = useSelector((state) => state.messages)
    .slice()
    .reverse();

  return (
    <div className="w-full space-y-2">
      {messages.map((message, index) => {
        return (
          <p
            key={index}
            className={clsx(
              "relative",
              index > 0 && "text-gray-700 dark:text-gray-400",
            )}
          >
            <span className="absolute top-[0] bottom-[0] left-[0] w-1 bg-gray-300 dark:bg-gray-600"></span>
            <span className="block pl-3">{message}</span>
          </p>
        );
      })}
    </div>
  );
};
