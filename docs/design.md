# Laundry Incremental

- One "turn" is one day of work, where you wear one set of clothes
- You start out with say 10 sets of clothes
- You get money for working each day (I guess you work weekends)
- After you run out, you can either buy more, or find ways of getting away with wearing the same clothes more than once. Buying more means you feel better about yourself, but you need to clear out space for the dirty laundry. These are the two main balancing mechanics
- You can never get rid of clothing, you can only store it
- The methods of freeing up space get progressively more absurd and time/money-consuming, like compressing dirty clothes with a vacuum sealer
- The methods of reusing clothing get worse over time, like turning underwear inside out to wear it again
- Reusing clothes eventually makes you embarrassed enough at work that you quit and get another one
- Storing clothes has an upper limit at which point you move out and get a bigger apartment
  The game will also show all the reminders you've set for yourself to do laundry, starting like "8:00PM do laundry" and progressing to "2:00AM SERIOUSLY YOU HAVE TO DO LAUNDRY YOU CAN'T LIVE LIKE THIS"
  your only options are snooze or dismiss
  I somehow have to make time pass faster over time... or appear to go faster
  "play Factorio"

## Trigger Warnings

The game should be possible to play without specific psychological effects. A trigger warning screen should show between phase 3 and phase 4, allowing players to disable certain simulations (panic attacks and emotional outbursts).

## Phase 1: Dumb Game

This is just a dumb game about putting on clothes, then they get dirty, then I do laundry. I don't know why I'm playing this.

## Phase 2: Procrastination

The player will not do laundry, but they will compulsively set reminders, despite always snoozing/dismissing them. The reminders become more dire over time.

## Phase 3: Absurd

The player goes to more desperate, absurd, and expensive lengths to avoid doing laundry, to the point of renting multiple apartments and abandoning them as they become full of dirty laundry.

## Phase 4: Psychological Horror

This is a game about procrastination, and the resulting shame, which loops to more procrastination. This causes increasingly negative effects on the player:

- Panic attacks in the middle of the night
- Insomnia (after / resulting from panic attacks)
- Workaholism

As these effects worsen, performance at work improves due to the compulsive focus on work and self-improvement. This causes imposter syndrome, worsening anxiety.

The game has hidden stats for "anxiety" and "sleep" which aren't exposed directly, but affect various parts of the game. Anxiety combined with sleep deprivation may result in:

- social isolation
- compulsive social media usage
- exhaustion, followed by napping for hours during the day
- difficulty with reading comprehension
- blurry vision
- hallucinations
- calling in sick
- breaking down and crying during work

This game does _not_ deal with depression or suicide.

## Phase 5: Redemption

The game ends with the player breaking the loop. This must be handled _very carefully_.

Guidelines:

- This should not follow the trope of hitting "rock bottom," which is overplayed and is not universally true. [Notes on addiction therapy and resource loss](https://sci-hub.se/https://www.tandfonline.com/doi/abs/10.3109/08039488.2015.1123293?journalCode=ipsc20)
- The game cannot prescribe a specific solution to a procrastination loop. What works for one person will not necessarily work for another.

## Loop

- Sleep
  Decide what to wear at work
- Work
  Decide how to spend free time
- Play games, binge TV, maybe other options
  Decide what to wear to sleep

# Modeling

## Inventory

- $ Money
- Clothing:
  - Shirts
  - Pants
  - Undergarments
  - Socks
- Other laundry
  - Bed sheets
  - Bath towels
  - Hand towels
- Shame (from wearing old clothes)
- Desperation
- Anxiety (hidden)
- Sleep (hidden)
- Apartment space (m³) current/max

## Upgrades

```typescript
type Effect = {
  // Compress clothing better
  clothingVolume: (num: number) => number;
  // Reuse clothing more times with less shame
  reuse: (num: number) => number;
  // Make time go faster / slower
  time: (num: number) => number;
  // Change rate of shame increase
  shame: (num: number) => number;
  // Change rate of desperation increase
  desperation: (num: number) => number;
  // Change rate of money increase
  money: (num: number) => number;
  // Is this additive or multiplicative with other upgrades?
  type: "add" | "multiply";
};

type Upgrade = {
  // Max level of this upgrade
  max?: number;
  // Required for this upgrade to appear. Once that happens, it's
  // always visible
  requirements: {
    money: number;
    shame: number;
    desperation: number;
    space: number;
  };
  // Required to buy this upgrade
  costs: {
    money: number;
    shame: number;
    desperation: number;
  };
  // Readable name in-game
  name: string;
  // Precise key for the upgrade (not string)
  key: UpgradeKey;
  // Changes caused by this upgrade
  effects: Effect[];
  // Message shown with each upgrade
  flavorTexts: string[];
};
```

## Jobs

Jobs have generic titles

## Prestige Upgrades

Select aspects of a new apartment based on your experiences (highest desperation? determination? pickiness?)

## Timers

- Time of day and day of week\
  No specified year, month, or date

  Passage of time is relative. Buy upgrades to speed up time, e.g. play Factorio to make the entire day pass by almost instantly

## Save Data

```tsx
type ReuseCount = number;
type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type SaveData = {
  day: Day;
  time: number;
  money: number;
  shame: number;
  desperation: number;
  job: Job;
  clothing: {
    [Key in ClothingName]: {
      [Key in ReuseCount]: number | undefined;
    };
  };
  upgrades: {
    [Key in UpgradeKey]: number;
  };
  apartmentSpace: number;
};
```
