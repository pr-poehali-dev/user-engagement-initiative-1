export type SlotCategory = "Фрукты" | "Приключения" | "Египет" | "Космос" | "Животные" | "Мифология" | "Пираты" | "Азия" | "Ретро" | "Мегавейс";

export interface SlotGame {
  id: number;
  name: string;
  provider: string;
  category: SlotCategory;
  rtp: number;
  maxWin: string;
  emoji: string;
  hot: boolean;
  new: boolean;
}

const PROVIDERS = ["NetEnt", "Pragmatic Play", "Play'n GO", "Microgaming", "Yggdrasil", "Novomatic", "IGT", "Betsoft", "Quickspin", "Elk Studios"];

const CATEGORIES: SlotCategory[] = ["Фрукты", "Приключения", "Египет", "Космос", "Животные", "Мифология", "Пираты", "Азия", "Ретро", "Мегавейс"];

const EMOJIS_BY_CATEGORY: Record<SlotCategory, string[]> = {
  "Фрукты":       ["🍒", "🍋", "🍊", "🍇", "🍓", "🍉", "🍑", "🫐", "🍎", "🍈"],
  "Приключения":  ["🗺️", "⚔️", "🏹", "🔮", "💰", "🗝️", "🏰", "🐉", "🦁", "🌟"],
  "Египет":       ["🏺", "🔱", "👁️", "🐍", "🌙", "☀️", "🦅", "⚱️", "🪬", "📜"],
  "Космос":       ["🚀", "🌌", "⭐", "🪐", "👽", "🛸", "💫", "🌠", "🔭", "🌑"],
  "Животные":     ["🐾", "🦊", "🐺", "🐻", "🦁", "🐯", "🦋", "🦅", "🦜", "🐘"],
  "Мифология":    ["⚡", "🔱", "🌊", "🔥", "🌪️", "🦄", "🐲", "🧿", "🪄", "🏺"],
  "Пираты":       ["🏴‍☠️", "⚓", "🗡️", "💀", "🦜", "🍾", "🔭", "🗺️", "💎", "🌊"],
  "Азия":         ["🐉", "🎋", "🌸", "🎎", "🀄", "🎍", "⛩️", "🪔", "🎐", "🌺"],
  "Ретро":        ["🎰", "🃏", "🎲", "🃏", "🪙", "💛", "🔔", "⭐", "🍀", "7️⃣"],
  "Мегавейс":     ["💎", "🌈", "⚡", "🔥", "💥", "🌟", "🎯", "🏆", "👑", "💫"],
};

const NAME_PARTS_BY_CATEGORY: Record<SlotCategory, { prefix: string[]; suffix: string[] }> = {
  "Фрукты":      { prefix: ["Sweet", "Juicy", "Wild", "Neon", "Lucky", "Golden", "Tropical", "Mega", "Super", "Hot"], suffix: ["Fruits", "Cherry", "Bonanza", "Party", "Rush", "Mania", "Harvest", "Garden", "Fiesta", "Burst"] },
  "Приключения": { prefix: ["Epic", "Dragon", "Crystal", "Lost", "Ancient", "Dark", "Mystic", "Shadow", "Fire", "Thunder"], suffix: ["Quest", "Kingdom", "Legend", "Treasure", "Hunt", "Trail", "Saga", "Realm", "World", "Empire"] },
  "Египет":      { prefix: ["Book of", "Eye of", "Tomb of", "Rise of", "Secret of", "Curse of", "Gold of", "Power of", "Sphinx", "Pharaoh's"], suffix: ["Ra", "Anubis", "Cleopatra", "Horus", "Osiris", "Seth", "Nile", "Scarab", "Cairo", "Luxor"] },
  "Космос":      { prefix: ["Star", "Galactic", "Cosmic", "Solar", "Lunar", "Nova", "Nebula", "Astro", "Hyper", "Quantum"], suffix: ["Wars", "Drift", "Voyage", "Force", "Spin", "Strike", "Blast", "Surge", "Rush", "Quest"] },
  "Животные":    { prefix: ["Wild", "Lucky", "Mighty", "Royal", "Golden", "Roaring", "Jungle", "Safari", "Magic", "Power"], suffix: ["Panda", "Wolf", "Lion", "Fox", "Bear", "Tiger", "Eagle", "Panther", "Rhino", "Jaguar"] },
  "Мифология":   { prefix: ["Age of", "Power of", "Wrath of", "Rise of", "Realm of", "Gods of", "Myth of", "Legacy of", "Throne of", "Hand of"], suffix: ["Zeus", "Thor", "Poseidon", "Ares", "Hades", "Odin", "Loki", "Ra", "Fenrir", "Medusa"] },
  "Пираты":      { prefix: ["Captain's", "Pirate's", "Buccaneer", "Jolly", "Sea Dog", "Corsair", "Skull", "Salty", "Buried", "Hidden"], suffix: ["Gold", "Bounty", "Cove", "Fortune", "Roger", "Chest", "Loot", "Plunder", "Bay", "Curse"] },
  "Азия":        { prefix: ["Dragon", "Lucky", "Golden", "Imperial", "Jade", "Mystic", "Rising", "Eastern", "Silk", "Lotus"], suffix: ["Emperor", "Dynasty", "Fortune", "Palace", "Lantern", "Temple", "Blossom", "Garden", "Gate", "Dragon"] },
  "Ретро":       { prefix: ["Classic", "Retro", "Vegas", "Old School", "Neon", "Vintage", "Lucky", "Mega", "Super", "Hot"], suffix: ["Sevens", "Bells", "Bars", "Diamonds", "Slots", "Stars", "Joker", "Fruits", "Money", "Cash"] },
  "Мегавейс":    { prefix: ["Big", "Mega", "Hyper", "Ultra", "Turbo", "Power", "Max", "Extreme", "Epic", "Super"], suffix: ["Megaways", "Ways", "Falls", "Strike", "Blast", "Surge", "Crunch", "Bonanza", "Crash", "Explosion"] },
};

function generateSlots(): SlotGame[] {
  const slots: SlotGame[] = [];
  let id = 1;

  CATEGORIES.forEach((category) => {
    const { prefix, suffix } = NAME_PARTS_BY_CATEGORY[category];
    const emojis = EMOJIS_BY_CATEGORY[category];
    const perCategory = 50;

    for (let i = 0; i < perCategory; i++) {
      const p = prefix[i % prefix.length];
      const s = suffix[Math.floor(i / prefix.length) % suffix.length];
      const variant = i >= prefix.length * suffix.length ? ` ${Math.floor(i / (prefix.length * suffix.length)) + 2}` : "";
      slots.push({
        id: id++,
        name: `${p} ${s}${variant}`,
        provider: PROVIDERS[i % PROVIDERS.length],
        category,
        rtp: parseFloat((92 + Math.random() * 6).toFixed(1)),
        maxWin: `x${[500, 1000, 2000, 5000, 10000, 25000][Math.floor(Math.random() * 6)]}`,
        emoji: emojis[i % emojis.length],
        hot: Math.random() < 0.15,
        new: Math.random() < 0.1,
      });
    }
  });

  return slots;
}

export const ALL_SLOTS: SlotGame[] = generateSlots();
export const SLOT_CATEGORIES: SlotCategory[] = CATEGORIES;
