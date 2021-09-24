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

## Loop

- Daily decision of what to wear\
  This is where you decide how to manage the clothes you have left

  At first, you don't have enough money to buy more clothes

  This eventually gets automated (somehow?) to be "make the same decision each day until you run out"

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

  Passage of time is highly situational. Buy upgrades to speed up time, e.g. play Factorio to make the entire day pass by almost instantly

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
