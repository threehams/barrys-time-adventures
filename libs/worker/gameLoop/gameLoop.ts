import {
  canPurchaseUpgrade,
  canShowUpgrade,
  findExploration,
  findUnlockFor,
  findUpgrade,
  getAllUpgrades,
  getSourceAmount,
  getSourceTime,
  initialState,
  sources,
  State,
  upgrades,
} from "@laundry/store";
import { sub } from "date-fns";
import { Draft } from "immer";
import { news } from "libs/store/data/news";
import { groupBy } from "lodash";

const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0);
const START_DATE = sub(THE_EVENT_DATE, { days: 30 });
const THE_EVENT_TIME = (THE_EVENT_DATE.valueOf() - START_DATE.valueOf()) / 1000;
const RESOURCE_DRAIN_BASE_TIME = 1_000;
export const AUTO_PURCHASE_TIME = 10_000;

type Updater = (state: Draft<State>, delta: number) => Draft<State> | void;

export const updateGame: Updater = (state, delta) => {
  let elapsedTime;
  if (state.phase === "preEvent") {
    elapsedTime = Math.min(
      delta * state.multiplier,
      THE_EVENT_TIME - state.time,
    );
  } else if (state.phase === "expand" || state.phase === "collapse") {
    elapsedTime = Math.min(delta * state.multiplier);
  } else {
    let explorationMultiplier = 1;
    if (state.exploration) {
      const exploration = findExploration(state.exploration);
      explorationMultiplier = exploration.timeMultiplier || 1;
    }
    elapsedTime = delta * state.multiplier * explorationMultiplier * 15;
  }
  updateAutoPurchase(state, elapsedTime);
  updateTime(state, elapsedTime);
  updateEvent(state, delta);
  updatePreResources(state, elapsedTime);
  updatePostResources(state, elapsedTime);
  updatePostStats(state, elapsedTime);
  updateExplore(state, elapsedTime);
  updateMessages(state, elapsedTime);
  updateMaxResources(state, elapsedTime);
};

const updateAutoPurchase: Updater = (state, delta) => {
  if (
    state.phase !== "preEvent" &&
    state.phase !== "expand" &&
    state.phase !== "collapse"
  ) {
    return;
  }

  if (state.phase === "preEvent" && !state.unlocks.autoPurchase) {
    return;
  }
  if (
    (state.phase === "expand" || state.phase === "collapse") &&
    !state.unlocks.autoPurchaseExpand
  ) {
    return;
  }

  state.timers.autoPurchase += delta;
  if (state.timers.autoPurchase > AUTO_PURCHASE_TIME) {
    const allUpgrades = upgrades.filter((upgrade) => {
      return (
        upgrade.phase === state.phase &&
        state.autoUpgrade[upgrade.source] &&
        canShowUpgrade({
          upgrade,
          maxResources: state.maxResources,
          phase: state.phase,
          playerExplorations: state.explorations,
          purchasedUpgrades: state.upgrades,
          resources: state.resources,
          timedUpgrades: state.timedUpgrades,
        })
      );
    });

    for (const upgrade of allUpgrades) {
      if (
        canPurchaseUpgrade({
          distance: 0,
          maxResources: state.maxResources,
          phase: state.phase,
          playerExplorations: state.explorations,
          purchasedUpgrades: state.upgrades,
          resources: state.resources,
          timedUpgrades: state.timedUpgrades,
          upgrade,
        }) &&
        (state.upgrades[upgrade.key]?.level ?? 0) <
          (state.autoUpgradeLevels[upgrade.key] ?? Infinity)
      ) {
        const currentLevel = state.upgrades[upgrade.key]?.level ?? 0;
        const nextLevel = currentLevel + 1;

        for (const costKey of Object.keys(upgrade.costs)) {
          state.resources[costKey] -=
            upgrade.costs[costKey]?.(nextLevel, 0) ?? 0;
        }
        state.upgrades[upgrade.key] = { level: nextLevel };
        if (state.phase === "preEvent") {
          state.timeline.push({
            time: state.time,
            action: {
              type: "BUY_UPGRADE",
              payload: {
                key: upgrade.key,
              },
            },
          });
        }
      }
    }
  }
};

const updateMaxResources: Updater = (state) => {
  for (const resource of Object.keys(state.resources)) {
    state.maxResources[resource] = Math.max(
      state.maxResources[resource],
      state.resources[resource],
    );
  }
};

const updateMessages: Updater = (state, delta) => {
  for (const [key, value] of Object.entries(state.timedUpgrades)) {
    const upgrade = findUpgrade(key);
    if (!value || upgrade.type !== "event" || state.replay) {
      continue;
    }

    if (value.time < state.time && value.time > state.time - delta) {
      let text = upgrade.description;
      if (upgrade.negated) {
        const negation = upgrade.negated.upgrade;
        if (
          state.upgrades[negation]?.level ||
          state.timedUpgrades[negation]?.level
        ) {
          text = upgrade.negated.message;
        }
      }

      if (text) {
        state.messages.push({ priority: "alert", text, time: state.time });
      }
    }
  }

  for (const newsMessage of news.filter(
    (message) => message.phase === state.phase,
  )) {
    let timePassed;
    if (newsMessage.phase === "expand") {
      timePassed =
        newsMessage.time &&
        newsMessage.time + state.expandStart! < state.time &&
        newsMessage.time + state.expandStart! > state.time - delta;
    } else if (newsMessage.phase === "collapse") {
      timePassed =
        newsMessage.time &&
        newsMessage.time + state.collapseStart! < state.time &&
        newsMessage.time + state.collapseStart! > state.time - delta;
    } else {
      timePassed =
        newsMessage.time &&
        newsMessage.time < state.time &&
        newsMessage.time > state.time - delta;
    }

    if (timePassed) {
      state.messages.push({
        priority: newsMessage.level ?? "news",
        text: newsMessage.text,
        time: state.time,
      });
    }
  }
};

const updateTime: Updater = (state, delta) => {
  if (state.time === THE_EVENT_TIME && state.phase === "preEvent") {
    state.phase = "event";
    state.timers = { ...initialState.timers };
    state.multiplier = 2;
    state.messages = [
      {
        priority: "info",
        text: "That was strange. Where am I?",
        time: state.time,
      },
    ];
    return;
  }

  if (state.phase !== "event" && state.phase !== "traveling") {
    if (
      state.phase === "preEvent" ||
      (state.phase === "postEvent" && state.exploration)
    ) {
      state.time = state.time + delta;
    }

    if (state.phase === "expand" || state.phase === "collapse") {
      state.time = state.time + delta;
    }
  }
};

const updateEvent: Updater = (state, delta) => {
  if (state.phase !== "event") {
    return;
  }
  state.timers.event += delta;
  if (state.timers.event > 1_000) {
    state.timers.event = 0;
    state.phase = "postEvent";
  }
};

const updatePreResources: Updater = (state, delta) => {
  const { timers, phase } = state;
  if (state.resources.barry >= 6_000_000_000 && phase === "expand") {
    state.collapseStart = state.time;
    state.phase = "collapse";
  }
  if (state.phase === "collapse" && state.resources.barry <= 0.99) {
    state.resources.barry = 0;
    state.phase = "done";
    return;
  }
  if (state.phase === "collapse") {
    // divide barrys by half every 10 seconds
    state.resources.barry -= (state.resources.barry * 0.5) / (8_000 / delta);
    return;
  }
  if (!(phase === "preEvent" || phase === "expand" || phase === "collapse")) {
    return;
  }

  const allUpgrades = getAllUpgrades(state);
  const upgradesBySource = groupBy(
    allUpgrades,
    (value) => value.upgrade.source,
  );

  for (const source of sources) {
    const sourceUpgrades = upgradesBySource[source.key];
    if (!sourceUpgrades) {
      continue;
    }

    timers[source.key] += delta;
    const time = getSourceTime(sourceUpgrades, source);

    // apply upgrades to time
    const counts = Math.floor(timers[source.key] / time);

    if (counts) {
      const perCount = getSourceAmount(sourceUpgrades, source);

      timers[source.key] = timers[source.key] % time;
      state.resources[source.resource] += Math.floor(counts * perCount);
      if (
        state.resources[source.resource] === null ||
        state.resources[source.resource] === Infinity
      ) {
        debugger;
      }
    }
  }
};

const updatePostResources: Updater = (state, delta) => {
  const { timers, phase } = state;
  if (phase !== "postEvent" || !state.exploration) {
    return;
  }

  timers.food += delta;
  const counts = Math.floor(timers.food / RESOURCE_DRAIN_BASE_TIME);

  if (counts) {
    for (const resource of ["food", "water"] as const) {
      const upgradedCounts = Object.entries(state.upgrades).reduce(
        (acc, [key, level]) => {
          const upgrade = findUpgrade(key);
          if (upgrade.phase !== phase) {
            return acc;
          }
          if (upgrade.effect[resource]) {
            return upgrade.effect[resource]!(level?.level ?? 0);
          }
          return counts;
        },
        counts,
      );
      timers[resource] = timers[resource] % RESOURCE_DRAIN_BASE_TIME;
      state.resources[resource] = Math.max(
        state.resources[resource] - upgradedCounts,
        0,
      );
    }
  }
};

const updatePostStats: Updater = (state, delta) => {
  if (state.phase !== "postEvent" || !state.exploration) {
    return;
  }

  const exploration = findExploration(state.exploration);
  for (const [stat, rate] of Object.entries(exploration.train)) {
    if (rate) {
      state.skills[stat].current += (delta * rate) / 400000;
      state.skills[stat].permanent += (delta * rate) / (400000 * 4);
    }
  }
};

const updateExplore: Updater = (state, delta) => {
  if (
    state.phase === "postEvent" &&
    (state.resources.food <= 0 || state.resources.water <= 0)
  ) {
    state.phase = "traveling";
    state.exploration = undefined;
    state.multiplier = 1;
    state.timers = { ...initialState.timers };
    const resource = state.resources.food <= 0 ? "food" : "water";
    state.messages.push({
      priority: "alert",
      time: state.time,
      text: `I'm out of ${resource}. I should go help out Past Barry so I can be better prepared.`,
    });
  }

  if (!state.exploration) {
    return;
  }
  const exploration = findExploration(state.exploration);
  const totalSkills = Object.entries(exploration.train).reduce(
    (acc, [key, multiplier]) => {
      if (!multiplier) {
        return acc;
      }
      const skill = state.skills[key];
      return skill.current * multiplier + skill.permanent * multiplier;
    },
    0,
  );

  const totalTime = delta * totalSkills * 0.25;
  const progress = (100 / exploration.time) * totalTime;
  state.explorations[state.exploration] ??= { progress: 0 };
  state.explorations[state.exploration]!.progress = Math.min(
    (state.explorations[state.exploration]!.progress ?? 0) + progress,
    100,
  );

  if (exploration.generates) {
    if (exploration.generates.power) {
      const power = (totalTime * exploration.generates.power) / 5_000;
      state.resources.power += power;
      let resourceCost = power * 10;
      const resources = (["food", "water"] as ["food", "water"]).sort(
        (a, b) => {
          return state.resources[b] - state.resources[a];
        },
      );
      for (const resource of ["money", "junk", ...resources] as const) {
        const available = state.resources[resource];
        const toDeduct = Math.min(available, resourceCost);
        state.resources[resource] = state.resources[resource] - toDeduct;
        resourceCost -= toDeduct;
      }
    }
  }

  if (state.explorations[state.exploration]!.progress === 100) {
    const unlock = findUnlockFor({ exploration: exploration.key });
    state.exploration = undefined;
    if (unlock && !state.unlocks[unlock.key]) {
      state.unlocks[unlock.key] = true;
      state.messages.push({ ...unlock.message, time: state.time });
    }
    if (unlock?.key === "convergence") {
      state.phase = "convergence";
      state.expandStart = state.time;
    }
    if (exploration.message) {
      state.messages.push({
        priority: "info",
        text: exploration.message,
        time: state.time,
      });
    }
  }
};
