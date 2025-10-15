
const ADJECTIVES = [
  "Ancient", "Azure", "Blazing", "Brave", "Bright", "Broken", "Burning", "Calm", "Celestial", "Crimson",
  "Crystal", "Dark", "Deep", "Dire", "Distant", "Divine", "Dream", "Echoing", "Elder", "Electric",
  "Emerald", "Eternal", "Fallen", "Fiery", "Forest", "Frozen", "Gentle", "Golden", "Grand", "Grave",
  "Great", "Green", "Grim", "Hallowed", "Hidden", "High", "Hollow", "Holy", "Honest", "Humble",
  "Iron", "Jade", "Keen", "Kindred", "Luminous", "Lunar", "Mighty", "Mystic", "Noble", "Northern",
  "Onyx", "Pale", "Phantom", "Proud", "Pure", "Quiet", "Radiant", "Rapid", "Red", "Regal",
  "Runic", "Sacred", "Savage", "Shadow", "Silent", "Silver", "Soaring", "Solar", "Solid", "Southern",
  "Spectral", "Spirit", "Star", "Steel", "Stone", "Storm", "Swift", "Thundering", "Timeless", "Twilight",
  "Unseen", "Valiant", "Vengeful", "Vivid", "Whispering", "Wild", "Wind", "Winter", "Wise", "Woven",
  "Young", "Zealous"
];

const NOUNS = [
  "Aegis", "Anchor", "Ash", "Blade", "Blaze", "Bloom", "Breeze", "Bridge", "Brook", "Canyon",
  "Cinder", "Cloud", "Coast", "Crag", "Crest", "Crown", "Dawn", "Defender", "Dragon", "Dreamer",
  "Drift", "Dusk", "Eagle", "Echo", "Edge", "Falcon", "Fang", "Feather", "Fell", "Field",
  "Flame", "Flare", "Fleet", "Flower", "Forest", "Forge", "Gale", "Gate", "Glade", "Glimmer",
  "Gorge", "Guard", "Haven", "Hawk", "Heart", "Helm", "Hero", "Hill", "Horizon", "Hunter",
  "Iron", "Island", "Jade", "Keeper", "Knight", "Lake", "Lance", "Light", "Lion", "Loom",
  "Lore", "Marsh", "Meadow", "Mist", "Moon", "Moor", "Mountain", "Nest", "Night", "Oak",
  "Oasis", "Ocean", "Peak", "Pine", "Pillar", "Pond", "Port", "Quill", "Raven", "Reach",
  "Ridge", "River", "Rock", "Rose", "Rune", "Saber", "Sage", "Sentinel", "Shadow", "Shield",
  "Shore", "Sky", "Snake", "Song", "Spark", "Spear", "Spirit", "Star", "Steel", "Stone",
  "Storm", "Stream", "Sun", "Thorn", "Throne", "Thunder", "Tower", "Trail", "Tree", "Valley",
  "Vanguard", "Veil", "Venture", "Viper", "Vision", "Warden", "Watcher", "Wave", "Whisper", "Wild",
  "Willow", "Wind", "Wing", "Wolf", "Wood", "Wyrm", "Path", "Pioneer", "Planet", "Pulse", "Pyre", "Quest", "Rain", "Realm", "Rebel", "Rider", "Ring", "Risk", "Robe", "Ruby", "Ruin", "Sail", "Scale", "Scout", "Sea", "Seeker", "Serpent", "Servant", "Shard", "Shine", "Silence", "Smoke", "Snow", "Sorcerer", "Source", "Spire", "Sprite", "Stallion", "Starfall", "Stone", "Storm", "Story", "Summer", "Sword", "Talon", "Tempest", "Thief", "Tide", "Tiger", "Titan", "Tome", "Torch", "Traveler", "Treasure", "Tribe", "Trickster", "Truth", "Valor", "Vessel", "Victor", "Void", "Voice", "Voyager", "Wanderer", "War", "Warrior", "Water", "Weaver", "Whirlwind", "Wilderness", "Winter", "Witch", "Wizard", "Wraith", "Zephyr"
];

export function generateRandomName(): string {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adjective}${noun}`;
}
