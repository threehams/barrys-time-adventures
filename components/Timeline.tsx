import { findUpgrade, StateAction } from "@laundry/store";
import { useSelector } from "./StateProvider";
import { format, hoursToMilliseconds, add, sub } from "date-fns";
import { groupBy, range } from "lodash";
import { Button } from "@laundry/ui";
import { useState } from "react";

const ONE_DAY = hoursToMilliseconds(24);
const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0);
const START_DATE = sub(THE_EVENT_DATE, { days: 30 });

export const Timeline = () => {
  const allEvents = useSelector((state) => state.timeline);
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);
  const timeline = groupBy(allEvents, (event) =>
    Math.floor(event.time / ONE_DAY),
  );
  const events = selectedDay !== undefined ? timeline[selectedDay] : undefined;

  return (
    <div>
      <h2>Timeline</h2>
      <ul>
        {range(0, 30).map((day) => {
          const availableEvents = timeline[day];
          return (
            <Button
              onClick={() => {
                if (selectedDay === day) {
                  setSelectedDay(undefined);
                  return;
                }
                setSelectedDay(day);
              }}
              key={day}
              variant={availableEvents ? "primary" : "secondary"}
            ></Button>
          );
        })}
      </ul>
      {events !== undefined && (
        <ul>
          {events.map((event) => {
            return (
              <li key={event.time}>
                {format(
                  add(START_DATE, { seconds: event.time / 1000 }),
                  "hh:mm bb",
                )}{" "}
                {formatAction(event.action)}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const formatAction = (action: StateAction) => {
  switch (action.type) {
    case "BUY_UPGRADE":
      return `Buy upgrade: ${findUpgrade(action.payload.key).name}`;
  }
};
