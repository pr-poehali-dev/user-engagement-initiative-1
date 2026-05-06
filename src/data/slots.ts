export type SlotCategory = "Популярные" | "Новинки" | "Египет" | "Мифология" | "Космос" | "Животные" | "Пираты" | "Азия" | "Ретро" | "Мегавейс" | "Приключения" | "Тёмный мир" | "Ацтеки" | "Викинги" | "Океан" | "Самураи" | "Киберпанк" | "Дикий запад";

export interface SlotGame {
  id: number;
  name: string;
  provider: string;
  category: SlotCategory;
  rtp: number;
  maxWin: string;
  image: string;
  hot: boolean;
  new: boolean;
  lines: number;
}

export const PROVIDERS = [
  "Pragmatic Play","Play'n GO","NetEnt","Microgaming",
  "Yggdrasil","Novomatic","BGaming","Betsoft",
  "Quickspin","Elk Studios","Red Tiger","Nolimit City",
  "Push Gaming","Thunderkick","Hacksaw Gaming","Relax Gaming",
];

export const PROVIDER_COLORS: Record<string, string> = {
  "Pragmatic Play": "from-red-600 to-orange-600",
  "Play'n GO":      "from-blue-600 to-cyan-600",
  "NetEnt":         "from-green-600 to-emerald-600",
  "Microgaming":    "from-purple-600 to-violet-600",
  "Yggdrasil":      "from-indigo-600 to-blue-600",
  "Novomatic":      "from-yellow-600 to-amber-600",
  "BGaming":        "from-pink-600 to-rose-600",
  "Betsoft":        "from-teal-600 to-cyan-600",
  "Quickspin":      "from-orange-600 to-red-600",
  "Elk Studios":    "from-lime-600 to-green-600",
  "Red Tiger":      "from-red-700 to-rose-600",
  "Nolimit City":   "from-slate-600 to-gray-700",
  "Push Gaming":    "from-violet-600 to-purple-600",
  "Thunderkick":    "from-amber-600 to-yellow-500",
  "Hacksaw Gaming": "from-cyan-600 to-sky-600",
  "Relax Gaming":   "from-emerald-600 to-teal-600",
};

const CATEGORIES: SlotCategory[] = [
  "Популярные","Новинки","Египет","Мифология","Космос",
  "Животные","Пираты","Азия","Ретро","Мегавейс",
  "Приключения","Тёмный мир","Ацтеки","Викинги","Океан",
  "Самураи","Киберпанк","Дикий запад",
];

const IMGS = {
  popular:   "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/f8af2f7f-48d8-477b-bb90-caeb48567433.jpg",
  new_:      "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/4c1e112c-6ef8-407b-a6db-5471aae33aa8.jpg",
  egypt:     "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/cbd3633c-7442-4c9c-ae5c-065b9b954448.jpg",
  myth:      "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/ef3b0996-ae6d-4b91-9f98-fa8b3e7add98.jpg",
  space:     "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/c5a38fff-7861-4802-b1b4-b5994380267c.jpg",
  animals:   "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/0df0b61e-e433-4783-b031-9a353b2e0b1b.jpg",
  pirates:   "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/bec15a23-1d18-4a44-a39b-d79f0a0d4e37.jpg",
  asia:      "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/9d3e905f-79c7-489f-9ca3-4a0ab2231168.jpg",
  retro:     "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/cdc0613f-2303-4467-907d-981a9b7812a1.jpg",
  mega:      "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/5641fb95-cf97-47a9-992b-260dd6e2eaaf.jpg",
  adventure: "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/09f860cb-1036-410f-aee2-f3a0d6e3a8e2.jpg",
  dark:      "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/8414efb1-36f7-47cc-b824-e4006b36db8d.jpg",
  aztec:     "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/09f860cb-1036-410f-aee2-f3a0d6e3a8e2.jpg",
  vikings:   "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/cfd6662d-59e5-4dc3-8ed4-188c7dcfb427.jpg",
  ocean:     "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/c8293012-03c3-420c-813a-e84d749aa18d.jpg",
  samurai:   "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/1214a3f6-904d-496d-bf12-013aee927373.jpg",
  cyber:     "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/4c1e112c-6ef8-407b-a6db-5471aae33aa8.jpg",
  west:      "https://cdn.poehali.dev/projects/3e5c171f-6606-4bf8-a648-d8f43812e473/files/5dad0d86-8571-4695-bea6-89db02620217.jpg",
};

const CATEGORY_IMAGES: Record<SlotCategory, string> = {
  "Популярные": IMGS.popular, "Новинки": IMGS.new_, "Египет": IMGS.egypt,
  "Мифология": IMGS.myth, "Космос": IMGS.space, "Животные": IMGS.animals,
  "Пираты": IMGS.pirates, "Азия": IMGS.asia, "Ретро": IMGS.retro,
  "Мегавейс": IMGS.mega, "Приключения": IMGS.adventure, "Тёмный мир": IMGS.dark,
  "Ацтеки": IMGS.aztec, "Викинги": IMGS.vikings, "Океан": IMGS.ocean,
  "Самураи": IMGS.samurai, "Киберпанк": IMGS.cyber, "Дикий запад": IMGS.west,
};

const SLOT_NAMES: Record<SlotCategory, string[]> = {
  "Популярные":  ["Sweet Bonanza","Gates of Olympus","Big Bass Bonanza","Wolf Gold","Starlight Princess","The Dog House","Wanted Dead or a Wild","Zombie Carnival","Fire Strike","Fruit Party","Eye of Cleopatra","Mystic Chief","Joker King","Power of Merlin","Wild West Gold","Release the Kraken","Gold Party","Lucky Lightning","Aztec Gems","Book of Kingdoms"],
  "Новинки":     ["Mighty Masks","Cash Patrol","Snake Arena","Fury of Odin","Chaos Crew","Rise of Samurai 4","Razor Shark 2","Poison Eve","Primal Wilderness","Explosive Reels","Hyper Burst","Pixel Smash","Neon Rush","Turbo Hunter","Drift Zone","Phantom Riches","Cyber Heist","Lava Links","Arctic Edge","Diamond Surge"],
  "Египет":      ["Book of Ra","Book of Dead","Legacy of Dead","Rise of Dead","Eye of Ra","Cleopatra Gold","Pharaoh's Fortune","Tutankhamun","Valley of Gods","Secrets of Atlantis","Ankh of Anubis","Scarab Kingdom","Nile Fortune","Desert Treasure","Golden Scarab","Sphinx Wild","Ra Legacy","Pyramid King","Luxor Gold","Cairo Nights"],
  "Мифология":   ["Gates of Olympus","Age of Gods","Wrath of Poseidon","Thor Megaways","Zeus vs Hades","Hand of Midas","Legacy of Poseidon","Rise of Olympus","Medusa Megaways","Fury of Zeus","Power of Thor","Thunderstruck","Kronos Unleashed","Hermes Wild","Athena Fortune","Ares Battle","Apollo Rising","Dionysus Feast","Hades Riches","Olympus Glory"],
  "Космос":      ["Starburst","Solar Queen","Cosmic Cash","Planet Fortune","Galactic Streak","Nebula","Star Clusters","Space Wars","Astro Spin","Solar Disc","Alien Robots","Moon Princess","Stellar Spins","Orbit Blast","Nova Strike","Pulsar Wilds","Meteor Cash","Hypernova","Space Heist","Galaxy Run"],
  "Животные":    ["Wolf Gold","Mighty Gorilla","Primal Hunt","Anaconda Wild","Lion Thunder","Panda Gold","Cheetah King","Safari Gold","Bear Tracks","Rhino Megaways","Wild Frames","Jaguar Night","Polar Ice","Tiger Glory","Eagle Eye","Shark Tank","Panther Moon","Buffalo Rising","Bull Fury","Snake Eyes"],
  "Пираты":      ["Pirate Gold","Treasure Island","Dead or Alive","Kraken Bounty","Pirate Charm","Corsair Queen","Ship of Plunder","Jolly Roger","Skull Storm","Buried Doubloons","Buccaneer Bay","Sea Bandit","Dead Man Chest","Anchor Bay","Silver Fleet","Rum Barrel","Cannon Bay","Black Flag","Marauder Gold","Cove of Fortune"],
  "Азия":        ["Dragon Kingdom","Caishen Gold","Imperial Riches","Lucky New Year","5 Lions Gold","Jade Butterfly","Floating Dragon","Eastern Emeralds","Sakura Fortune","Dragon Hot","Panda Fortune","Bamboo Rush","Golden Dragon","Koi Gate","Fu Fu Fu","Lucky Twins","Red Envelope","Ming Dynasty","Dynasty Gold","Jade Tiger"],
  "Ретро":       ["Classic 777","Double Diamond","Triple Gold","Bar Black Sheep","Neon Joker","Vegas Hot","Lucky Sevens","Crown Gems","King of Luck","Royal Sevens","Bells on Fire","Super Hot","Hold and Win","Cash Volt","Gold Rush","Crystal Fruits","Blazing Bells","Silver Bling","Star Joker","Wild Classic"],
  "Мегавейс":    ["Bonanza Megaways","Extra Chilli Megaways","Gonzo Megaways","Megaways Jack","Buffalo King Megaways","Book of Atem Megaways","Primal Megaways","Fruit Shop Megaways","Eye of Horus Megaways","Big Bass Megaways","Aztec Gold Megaways","Gold Megaways","Power Megaways","Dragon Megaways","Wolf Megaways","Lightning Megaways","Thunder Megaways","Hyper Megaways","Titan Megaways","Mega Burst"],
  "Приключения": ["Gonzo Quest","Lost Relics","The Explorers","Adventure Palace","Jungle Spirit","Crystal Cave","Tomb Adventure","Legend of Shangri-La","Temple Quest","Firefly Frenzy","Mystic Millions","Hidden Valley","Treasure Mine","Golden Ticket","Rich Wilde","Gold Digger","Fortune Trail","Quest for Gold","Relic Seekers","Indiana Gold"],
  "Тёмный мир":  ["Blood Suckers","Dark Vortex","Creepy Carnival","Demon Lair","Necromancer","Poison Eva","Deadwood","Toxic Riches","Dead Canary","Twilight Princess","Night Werewolf","Voodoo Gold","Crypt of Dead","Zombie Circus","Witch Brew","Shadow Dragon","Cursed Chest","Hellish Spin","Soul Reaper","Nightmare"],
  "Ацтеки":      ["Aztec Gold","Temple of Aztec","Jungle Gold","Mayan Riches","Aztec Kingdom","Sun God","Pyramid Spins","Quetzal King","Aztec Warrior","Jade Spirit","Gold of Maya","Sacred Sun","Temple Run","Feathered Serpent","Tribal Spirit","Golden Idol","Ancient Riches","Inca Fortune","Aztec Blaze","Mayan Fire"],
  "Викинги":     ["Vikings Go Berzerk","Odin Riches","Thor Lightning","Viking Runecraft","Valhalla Gold","Norse Storm","Shield Maiden","Berserker Wilds","Fjord Treasure","Ragnarok Reels","Odin Quest","Viking Clash","Axe of Freyr","Loki Fortune","Norse Magic","Viking Conquest","Frost Giant","Saga of Odin","Midgard Gold","Battle of Asgard"],
  "Океан":       ["Poseidon Gold","Mermaid Fortune","Deep Blue","Sharks Sea","Atlantis Rising","Coral Cash","Ocean Treasure","Neptune Kingdom","Kraken Deep","Aqua Cash","Triton Fortune","Pearl Lagoon","Dolphin Cash","Reef Wild","Submarine","Blue Lagoon","Wave Breaker","Tidal Gold","Marlin Wild","Leviathan"],
  "Самураи":     ["Rise of Samurai","Katana Ways","Bushido Blade","Shogun Fortune","Ninja Warrior","Geisha Wilds","Ronin Riches","Feudal Fortune","Sakura Samurai","Daimyo Gold","Cherry Blossom","Oni Thunder","Tanuki Riches","Mt Fuji Fortune","Katana King","Sword of Fate","Temple Bell","Iron Mask","Dragon of Nippon","Shogun Megaways"],
  "Киберпанк":   ["Neon Future","Cyber Cash","Digital Chaos","Matrix Spins","Cyber City","Robo Riches","Hack the Reels","Glitch Gold","Pixel Wars","Circuit Breaker","Drone Zone","HexTech","Data Heist","Voltage X","Neon District","Bit Bandit","System Crash","Synthwave","Crypto King","Neural Net"],
  "Дикий запад": ["Wanted Dead or Wild","Desperado","Gold Rush","Cowboy Gold","Dead Saloon","Outlaw Fortune","Six Shooter","Marshal Gold","Tombstone","Rustler Riches","Bonnie Clyde","Train Robbery","Dynamite Riches","Bandito Wild","Boot Hill","Frontier Gold","Prairie Wind","Lasso Gold","Canyon Spins","Cactus Wild"],
};

function generateSlots(): SlotGame[] {
  const slots: SlotGame[] = [];
  let id = 1;

  CATEGORIES.forEach((cat) => {
    const names = SLOT_NAMES[cat];
    const img = CATEGORY_IMAGES[cat];
    const perCat = Math.ceil(500 / CATEGORIES.length);
    for (let i = 0; i < perCat && slots.length < 500; i++) {
      const baseName = names[i % names.length];
      const suffix = i >= names.length ? ` ${Math.floor(i / names.length) + 2}` : "";
      slots.push({
        id: id++,
        name: baseName + suffix,
        provider: PROVIDERS[(id * 3 + i) % PROVIDERS.length],
        category: cat,
        rtp: parseFloat((93 + Math.random() * 5).toFixed(1)),
        maxWin: `x${[1000,2000,5000,10000,25000,50000][Math.floor(Math.random()*6)]}`,
        image: img,
        hot: Math.random() < 0.18,
        new: Math.random() < 0.12,
        lines: [10,20,25,40,50,100,243][Math.floor(Math.random()*7)],
      });
    }
  });
  return slots.slice(0, 500);
}

export const ALL_SLOTS: SlotGame[] = generateSlots();
export const SLOT_CATEGORIES: SlotCategory[] = CATEGORIES;
