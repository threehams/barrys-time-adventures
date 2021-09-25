import clsx from "clsx";
import { useSelector } from "./StateProvider";

export const Window = () => {
  const messages = useSelector((state) => state.messages);
  return (
    <div className="w-full border min-h-[400px] p-4 overflow-y-auto">
      {messages.map((message, index) => {
        return (
          <p
            key={message}
            className={clsx(index !== messages.length - 1 && "text-gray-500")}
          >
            {message}
          </p>
        );
      })}
    </div>
  );
};
