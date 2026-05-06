export type SlotCategory = "Египет" | "Мифология" | "Космос" | "Животные" | "Пираты" | "Азия" | "Ретро" | "Мегавейс" | "Приключения" | "Тёмный мир";

export interface SlotGame {
  id: number;
  name: string;
  provider: string;
  category: SlotCategory;
  rtp: number;
  maxWin: string;
  image: string;
  providerLogo: string;
  hot: boolean;
  new: boolean;
  reels: number;
  lines: number;
}

const PROVIDERS = [
  "NetEnt", "Pragmatic Play", "Play'n GO", "Microgaming",
  "Yggdrasil", "Novomatic", "IGT", "Betsoft", "Quickspin", "Elk Studios",
];

const CATEGORIES: SlotCategory[] = [
  "Египет", "Мифология", "Космос", "Животные", "Пираты",
  "Азия", "Ретро", "Мегавейс", "Приключения", "Тёмный мир",
];

const CATEGORY_IMAGES: Record<SlotCategory, string> = {
  "Египет":      "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/cbd3633c-7442-4c9c-ae5c-065b9b954448.jpg",
  "Мифология":   "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/ef3b0996-ae6d-4b91-9f98-fa8b3e7add98.jpg",
  "Космос":      "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/c5a38fff-7861-4802-b1b4-b5994380267c.jpg",
  "Животные":    "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/0df0b61e-e433-4783-b031-9a353b2e0b1b.jpg",
  "Пираты":      "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/bec15a23-1d18-4a44-a39b-d79f0a0d4e37.jpg",
  "Азия":        "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/9d3e905f-79c7-489f-9ca3-4a0ab2231168.jpg",
  "Ретро":       "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/cdc0613f-2303-4467-907d-981a9b7812a1.jpg",
  "Мегавейс":    "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/5641fb95-cf97-47a9-992b-260dd6e2eaaf.jpg",
  "Приключения": "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/5641fb95-cf97-47a9-992b-260dd6e2eaaf.jpg",
  "Тёмный мир":  "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/0df0b61e-e433-4783-b031-9a353b2e0b1b.jpg",
};

export const PROVIDER_LOGOS: Record<string, string> = {
  "NetEnt":         "🎮",
  "Pragmatic Play": "🏆",
  "Play'n GO":      "🎲",
  "Microgaming":    "💎",
  "Yggdrasil":      "🐉",
  "Novomatic":      "⚡",
  "IGT":            "🌟",
  "Betsoft":        "🎯",
  "Quickspin":      "🚀",
  "Elk Studios":    "🦌",
};

const NAME_PARTS: Record<SlotCategory, { prefix: string[]; suffix: string[] }> = {
  "Египет":      { prefix: ["Book of", "Eye of", "Tomb of", "Rise of", "Secret of", "Curse of", "Gold of", "Power of", "Sphinx of", "Pharaoh's"], suffix: ["Ra", "Anubis", "Cleopatra", "Horus", "Osiris", "Seth", "Nile", "Scarab", "Cairo", "Luxor"] },
  "Мифология":   { prefix: ["Age of", "Power of", "Wrath of", "Rise of", "Realm of", "Gods of", "Legacy of", "Throne of", "Thunder of", "Hand of"], suffix: ["Zeus", "Thor", "Poseidon", "Ares", "Hades", "Odin", "Loki", "Fenrir", "Medusa", "Atlas"] },
  "Космос":      { prefix: ["Star", "Galactic", "Cosmic", "Solar", "Lunar", "Nova", "Nebula", "Astro", "Hyper", "Quantum"], suffix: ["Wars", "Drift", "Voyage", "Force", "Spin", "Strike", "Blast", "Surge", "Rush", "Odyssey"] },
  "Животные":    { prefix: ["Wild", "Lucky", "Mighty", "Royal", "Golden", "Roaring", "Jungle", "Safari", "Magic", "Power"], suffix: ["Wolf", "Lion", "Fox", "Bear", "Tiger", "Eagle", "Panther", "Rhino", "Jaguar", "Cobra"] },
  "Пираты":      { prefix: ["Captain's", "Pirate's", "Buccaneer", "Jolly", "Sea Dog", "Corsair", "Skull", "Salty", "Buried", "Hidden"], suffix: ["Gold", "Bounty", "Cove", "Fortune", "Roger", "Chest", "Loot", "Plunder", "Bay", "Curse"] },
  "Азия":        { prefix: ["Dragon", "Lucky", "Golden", "Imperial", "Jade", "Mystic", "Rising", "Eastern", "Silk", "Lotus"], suffix: ["Emperor", "Dynasty", "Fortune", "Palace", "Lantern", "Temple", "Blossom", "Garden", "Gate", "Warrior"] },
  "Ретро":       { prefix: ["Classic", "Vegas", "Old School", "Neon", "Vintage", "Lucky", "Mega", "Super", "Hot", "Diamond"], suffix: ["Sevens", "Bells", "Bars", "Joker", "Stars", "Crown", "Ace", "King", "Double", "Triple"] },
  "Мегавейс":    { prefix: ["Big", "Mega", "Hyper", "Ultra", "Turbo", "Power", "Max", "Extreme", "Epic", "Super"], suffix: ["Megaways", "Ways", "Falls", "Strike", "Blast", "Surge", "Crunch", "Bonanza", "Crash", "Explosion"] },
  "Приключения": { prefix: ["Epic", "Crystal", "Lost", "Ancient", "Dark", "Mystic", "Shadow", "Fire", "Thunder", "Iron"], suffix: ["Quest", "Kingdom", "Legend", "Treasure", "Hunt", "Trail", "Saga", "Realm", "Empire", "Tower"] },
  "Тёмный мир":  { prefix: ["Dark", "Shadow", "Blood", "Death", "Cursed", "Infernal", "Demon", "Necro", "Void", "Abyss"], suffix: ["Throne", "Legion", "Gate", "Realm", "Knight", "Lord", "Pact", "Rift", "Doom", "Soul"] },
};

function generateSlots(): SlotGame[] {
  const slots: SlotGame[] = [];
  let id = 1;

  CATEGORIES.forEach((category) => {
    const { prefix, suffix } = NAME_PARTS[category];
    const perCategory = 50;

    for (let i = 0; i < perCategory; i++) {
      const p = prefix[i % prefix.length];
      const s = suffix[Math.floor(i / prefix.length) % suffix.length];
      const variant = Math.floor(i / (prefix.length * suffix.length)) > 0
        ? ` ${Math.floor(i / (prefix.length * suffix.length)) + 2}`
        : "";
      const provider = PROVIDERS[id % PROVIDERS.length];
      slots.push({
        id: id++,
        name: `${p} ${s}${variant}`,
        provider,
        category,
        rtp: parseFloat((93 + Math.random() * 5).toFixed(1)),
        maxWin: `x${[1000, 2000, 5000, 10000, 25000, 50000][Math.floor(Math.random() * 6)]}`,
        image: CATEGORY_IMAGES[category],
        providerLogo: PROVIDER_LOGOS[provider] ?? "🎮",
        hot: Math.random() < 0.15,
        new: Math.random() < 0.1,
        reels: 5,
        lines: [10, 20, 25, 40, 50][Math.floor(Math.random() * 5)],
      });
    }
  });

  return slots;
}

export const ALL_SLOTS: SlotGame[] = generateSlots();
export const SLOT_CATEGORIES: SlotCategory[] = CATEGORIES;
