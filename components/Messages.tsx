import clsx from "clsx";
import { useSelector } from "./StateProvider";

export const Messages = () => {
  const messages = useSelector((state) => state.messages).slice(-3);

  return (
    <div className="w-full p-4 text-gray-300 border">
      {messages.map((message, index) => {
        return (
          <p
            key={index}
            className={clsx(
              index === messages.length - 2 && "text-gray-500",
              index === messages.length - 1 && "text-gray-900",
            )}
          >
            {message}
          </p>
        );
      })}
    </div>
  );
};
