import {
  canPurchaseUpgrade,
  findUpgrade,
  StateAction,
  Upgrade,
  upgradeCost,
  UpgradeKey,
} from "@laundry/store";
import { useDispatch, useSelector } from "./StateProvider";
import {
  format,
  hoursToMilliseconds,
  add,
  sub,
  hoursToSeconds,
} from "date-fns";
import { groupBy, range } from "lodash";
import { Button } from "@laundry/ui";
import { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";
import { isNonNullable } from "@laundry/utils";

const ONE_DAY = hoursToMilliseconds(24) / 1000;
const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0);
const START_DATE = sub(THE_EVENT_DATE, { days: 30 });

type TimelineProps = {
  selectedUpgradeKey: UpgradeKey | undefined;
  setSelectedUpgrade: Dispatch<SetStateAction<UpgradeKey | undefined>>;
};
export const Timeline = ({
  selectedUpgradeKey,
  setSelectedUpgrade,
}: TimelineProps) => {
  const dispatch = useDispatch();
  const preEvents = useSelector((state) => state.timeline);
  const unlocks = useSelector((state) => state.unlocks);
  const timedUpgradeMap = useSelector((state) => state.timedUpgrades);
  const purchasedUpgrades = useSelector((state) => state.upgrades);
  const playerExplorations = useSelector((state) => state.explorations);
  const phase = useSelector((state) => state.phase);
  const resources = useSelector((state) => state.resources);
  const maxResources = useSelector((state) => state.maxResources);
  const currentDay = useSelector((state) =>
    Math.floor(state.time / hoursToSeconds(24)),
  );
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);
  const selectedUpgrade = selectedUpgradeKey
    ? findUpgrade(selectedUpgradeKey)
    : undefined;

  const timedUpgrades = Object.entries(timedUpgradeMap)
    .filter((entry) => isNonNullable(entry[1]))
    .map(([key, value]): TimelineEvent => {
      const upgrade = findUpgrade(key);
      return {
        type: upgrade.type === "purchased" ? "permanent" : "event",
        time: value!.time,
        text: `${upgrade.type === "purchased" ? "Timed upgrade" : "Event"}: ${
          upgrade.name
        }`,
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
    <div className="inline-block">
      <div className="relative flex items-center justify-between">
        <h2>Timeline</h2>
        {unlocks.loop && phase === "traveling" && (
          <Button
            variant="danger"
            onClick={() => {
              dispatch({ type: "LOOP" });
            }}
          >
            Loop
          </Button>
        )}
      </div>
      {phase !== "preEvent" && <div>You Are Here</div>}
      <ul className="flex flex-nowrap">
        {range(0, 30).map((day) => {
          const availableUpgrades = !!timeline[day]?.find(
            (event) => event.type === "upgrade",
          );
          const availablePermanent = !!timeline[day]?.find(
            (event) => event.type === "permanent",
          );
          const availableEvent = !!timeline[day]?.find(
            (event) => event.type === "event",
          );
          const muted =
            (selectedUpgrade &&
              !canPurchaseUpgrade({
                phase,
                upgrade: selectedUpgrade,
                resources,
                maxResources,
                distance: 29 - day,
                purchasedUpgrades,
                timedUpgrades: timedUpgradeMap,
                playerExplorations,
              })) ||
            (phase === "traveling" &&
              selectedDay !== undefined &&
              selectedDay <= day) ||
            (phase === "preEvent" && day < currentDay);
          return (
            <button
              className={clsx(
                "inline-grid relative border-2 border-gray-800 dark:border-gray-300 w-[32px] h-[32px] grid-cols-2 grid-rows-2 -ml-[2px]",
                muted && "border-opacity-20 dark:border-opacity-20",
                day === selectedDay && "shadow-[0_0_0_3px_red] z-10",
              )}
              style={{
                gridTemplateAreas: `
                "upgrade permanent"
                "event ."
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
              {availableEvent && (
                <div className="[grid-area:event] aspect-[1/1] bg-red-500"></div>
              )}
            </button>
          );
        })}
      </ul>
      {selectedDay !== undefined && (
        <DayDetail
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          timeline={timeline}
          selectedUpgrade={selectedUpgrade}
          setSelectedUpgrade={setSelectedUpgrade}
        ></DayDetail>
      )}
    </div>
  );
};

type TimelineEvent = {
  type: "upgrade" | "permanent" | "event";
  time: number;
  text: string;
};

type DayDetailProps = {
  selectedDay: number;
  setSelectedDay: (day: number | undefined) => void;
  selectedUpgrade: Upgrade | undefined;
  setSelectedUpgrade: Dispatch<SetStateAction<UpgradeKey | undefined>>;
  timeline: {
    [key: number]: TimelineEvent[];
  };
};
const DayDetail = ({
  selectedDay,
  setSelectedDay,
  timeline,
  selectedUpgrade,
  setSelectedUpgrade,
}: DayDetailProps) => {
  const events = timeline[selectedDay];
  const phase = useSelector((state) => state.phase);
  const timedUpgradeMap = useSelector((state) => state.timedUpgrades);
  const resources = useSelector((state) => state.resources);
  const dispatch = useDispatch();

  return (
    <div
      className="relative grid grid-cols-[1fr_50px]"
      style={{
        gridTemplateAreas: `
      "restart close"
      "events events"
    `,
      }}
    >
      <Button
        className="[grid-area:close]"
        onClick={() => {
          setSelectedDay(undefined);
        }}
      >
        X
      </Button>
      {selectedUpgrade && (
        <div className="[grid-area:restart]">
          <Button
            onClick={() => {
              dispatch({
                type: "BUY_TIMED_UPGRADE",
                payload: {
                  key: selectedUpgrade.key,
                  day: selectedDay,
                },
              });
              setSelectedUpgrade(undefined);
            }}
          >
            Send Upgrade (
            {upgradeCost({
              upgrade: selectedUpgrade,
              resources,
              currentLevel: timedUpgradeMap[selectedUpgrade.key]?.level,
              distance: 29 - selectedDay,
            })
              .map((resource) => `${resource.cost} ${resource.key}`)
              .join(",")}
            )
          </Button>
        </div>
      )}
      {selectedDay !== undefined && phase !== "preEvent" && !selectedUpgrade && (
        <div className="[grid-area:restart]">
          <Button
            variant="danger"
            onClick={() => {
              setSelectedDay(undefined);
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
        </div>
      )}
      {events !== undefined && (
        <ul className="[grid-area:events]">
          {events.map((event) => {
            return (
              <li key={event.time} className="flex items-center">
                <div
                  className={clsx(
                    "w-[14px] h-[14px] inline-block mr-1",
                    event.type === "upgrade"
                      ? "bg-blue-700"
                      : event.type === "event"
                      ? "bg-red-500"
                      : "bg-green-500",
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
    </div>
  );
};

const formatAction = (action: StateAction) => {
  switch (action.type) {
    case "BUY_UPGRADE":
      return `Buy upgrade: ${findUpgrade(action.payload.key).name}`;
    case "BUY_TIMED_UPGRADE": {
      const upgrade = findUpgrade(action.payload.key);
      if (upgrade.type === "purchased") {
        return `Timed upgrade: ${upgrade.name}`;
      }
      return `Event: ${upgrade.name}`;
    }
    default:
      throw new Error(`No text found for action: ${action.type}`);
  }
};
