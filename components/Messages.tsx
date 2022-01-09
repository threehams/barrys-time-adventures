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
            className={clsx("relative", textColor(message.priority, index))}
          >
            <span
              className={clsx(
                "absolute top-[0] bottom-[0] left-[0] w-1",
                message.priority === "alert"
                  ? "bg-red-500"
                  : " bg-gray-300 dark:bg-gray-600",
              )}
            ></span>
            <span className="block pl-3">{message.text}</span>
          </p>
        );
      })}
    </div>
  );
};

const textColor = (priority: "info" | "alert", index: number) => {
  if (priority === "info") {
    return index > 0 && "text-gray-700 dark:text-gray-400";
  }
  return index > 0 ? "text-red-700" : "text-red-500";
};
