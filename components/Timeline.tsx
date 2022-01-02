import { findUpgrade, StateAction } from "@laundry/store";
import { useDispatch, useSelector } from "./StateProvider";
import { format, hoursToMilliseconds, add, sub } from "date-fns";
import { groupBy, range } from "lodash";
import { Button } from "@laundry/ui";
import { useState } from "react";
import clsx from "clsx";
import { isNonNullable } from "@laundry/utils";

const ONE_DAY = hoursToMilliseconds(24) / 1000;
const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0);
const START_DATE = sub(THE_EVENT_DATE, { days: 30 });

export const Timeline = () => {
  const preEvents = useSelector((state) => state.timeline);
  const timedUpgradeMap = useSelector((state) => state.timedUpgrades);
  const phase = useSelector((state) => state.phase);
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);

  const timedUpgrades = Object.entries(timedUpgradeMap)
    .filter((entry) => isNonNullable(entry[1]))
    .map(([key, value]): TimelineEvent => {
      const upgrade = findUpgrade(key);
      return {
        type: "permanent",
        time: value!.time,
        text: `Time upgrade: ${upgrade.name}`,
      };
    });
  const events = preEvents.map((event): TimelineEvent => {
    return {
      type: "upgrade",
      time: event.time,
      text: formatAction(event.action),
    };
  });
  const allEvents = [...timedUpgrades, ...events];
  const timeline = groupBy(allEvents, (event) =>
    Math.floor(event.time / ONE_DAY),
  );

  return (
    <div>
      <h2>Timeline</h2>
      <ul className="flex flex-nowrap">
        {range(0, 30).map((day) => {
          const availableUpgrades = !!timeline[day]?.find(
            (event) => event.type === "upgrade",
          );
          const availablePermanent = !!timeline[day]?.find(
            (event) => event.type === "permanent",
          );
          return (
            <button
              className={clsx(
                "inline-grid border-2 border-gray-800 w-[32px] h-[32px] grid-cols-2 grid-rows-2 border-l-0 first-of-type:border-l-2",
                phase === "traveling" &&
                  selectedDay !== undefined &&
                  day > selectedDay &&
                  "border-opacity-20",
              )}
              style={{
                gridTemplateAreas: `
                "upgrade permanent"
                ". ."
              `,
              }}
              onClick={() => {
                if (selectedDay === day) {
                  setSelectedDay(undefined);
                  return;
                }
                setSelectedDay(day);
              }}
              key={day}
            >
              {availableUpgrades && (
                <div
                  className={clsx(
                    "[grid-area:upgrade] aspect-[1/1] bg-blue-700",
                    phase === "traveling" &&
                      selectedDay !== undefined &&
                      selectedDay <= day &&
                      "opacity-20",
                  )}
                ></div>
              )}
              {availablePermanent && (
                <div className="[grid-area:permanent] aspect-[1/1] bg-green-500"></div>
              )}
            </button>
          );
        })}
      </ul>
      {selectedDay !== undefined && (
        <DayDetail selectedDay={selectedDay} timeline={timeline}></DayDetail>
      )}
    </div>
  );
};

type TimelineEvent = {
  type: "upgrade" | "permanent";
  time: number;
  text: string;
};

type DayDetailProps = {
  selectedDay: number;
  timeline: {
    [key: number]: TimelineEvent[];
  };
};
const DayDetail = ({ selectedDay, timeline }: DayDetailProps) => {
  const events = timeline[selectedDay];
  const phase = useSelector((state) => state.phase);
  const dispatch = useDispatch();

  return (
    <div>
      {events !== undefined && (
        <ul>
          {events.map((event) => {
            return (
              <li key={event.time} className="flex items-center">
                <div
                  className={clsx(
                    "w-[14px] h-[14px] inline-block mr-1",
                    event.type === "upgrade" ? "bg-blue-700" : "bg-green-500",
                  )}
                />
                <span
                  className={clsx(
                    phase === "traveling" &&
                      event.type === "upgrade" &&
                      "text-gray-500",
                  )}
                >
                  {format(
                    add(START_DATE, { seconds: event.time * 1000 }),
                    "hh:mm bb",
                  )}{" "}
                  {event.text}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {selectedDay !== undefined && phase !== "preEvent" && (
        <Button
          variant="danger"
          onClick={() => {
            dispatch({
              type: "TRAVEL",
              payload: {
                day: selectedDay,
              },
            });
          }}
        >
          Restart Here
        </Button>
      )}
    </div>
  );
};

const formatAction = (action: StateAction) => {
  switch (action.type) {
    case "BUY_UPGRADE":
      return `Buy upgrade: ${findUpgrade(action.payload.key).name}`;
    default:
      throw new Error(`No text found for action: ${action.type}`);
  }
};
