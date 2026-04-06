// src/utils/curriculumData.js
// ─────────────────────────────────────────────────────────────────────────────
// SEED DATA  –  run seedCurriculumToFirestore() once from the admin panel
//              to populate Firestore with the initial PearlX curriculum.
//
// Firestore structure:
//   /curriculum/{docId}
//     category     : "little_pearls" | "bright_pearls" | "rising_pearls"
//     moduleNumber : number
//     moduleName   : string
//     moduleEmoji  : string
//     lessons      : [{ id, lessonNumber, title, platform, description, notes, pptLink }]
// ─────────────────────────────────────────────────────────────────────────────
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const CATEGORIES = [
  { value: "little_pearls",  label: "🐥 Little Pearls",  ages: "Ages 5–7 • Grades K–2" },
  { value: "bright_pearls",  label: "🌱 Bright Pearls",  ages: "Ages 8–11 • Grades 3–6" },
  { value: "rising_pearls",  label: "🦋 Rising Pearls",  ages: "Ages 12–15 • Grades 7–10" },
];

// ── Shared lesson list (same titles across all 3 categories) ──────────────
const MODULES_SEED = [
  {
    moduleNumber: 1, moduleName: "Coding Fundamentals", moduleEmoji: "🖥️",
    lessons: [
      { lessonNumber: 1,  title: "What is a Computer?",                platform: "Code.org + Scratch" },
      { lessonNumber: 2,  title: "Sequences: Step by Step",             platform: "Code.org + Scratch" },
      { lessonNumber: 3,  title: "Loops: Repeat the Fun!",              platform: "Code.org + Scratch" },
      { lessonNumber: 4,  title: "Events: Make Things Happen!",         platform: "Code.org + Scratch" },
      { lessonNumber: 5,  title: "Debugging: Finding Mistakes",         platform: "Code.org + Scratch" },
      { lessonNumber: 6,  title: "Conditionals: If This, Then That",    platform: "Code.org + Scratch" },
      { lessonNumber: 7,  title: "Nested Loops: Patterns & Designs",    platform: "Code.org + Scratch" },
      { lessonNumber: 8,  title: "Functions: Little Helpers",           platform: "Code.org + Scratch" },
      { lessonNumber: 9,  title: "Binary & Data: Secret Codes",         platform: "Code.org + Scratch" },
      { lessonNumber: 10, title: "Algorithms: Planning Like a Computer", platform: "Code.org + Scratch" },
      { lessonNumber: 11, title: "Unplugged: Coding Without Computers", platform: "Code.org + Scratch" },
      { lessonNumber: 12, title: "Mini Showcase: My First Program!",    platform: "Scratch" },
    ],
  },
  {
    moduleNumber: 2, moduleName: "Scientific Exploration", moduleEmoji: "🔬",
    lessons: [
      { lessonNumber: 1,  title: "The Water Cycle Story",               platform: "Scratch" },
      { lessonNumber: 2,  title: "Day & Night: Sun and Moon",           platform: "Scratch" },
      { lessonNumber: 3,  title: "Plants Need Love: Growth Story",      platform: "Scratch" },
      { lessonNumber: 4,  title: "Kindness Matters: The Helping Hand",  platform: "Scratch" },
      { lessonNumber: 5,  title: "The Honest Woodcutter",               platform: "Scratch" },
      { lessonNumber: 6,  title: "Healthy Habits Heroes",               platform: "Scratch" },
      { lessonNumber: 7,  title: "Animals & Their Homes",               platform: "Scratch" },
      { lessonNumber: 8,  title: "The Four Seasons",                    platform: "Scratch" },
      { lessonNumber: 9,  title: "Be a Good Friend",                    platform: "Scratch" },
      { lessonNumber: 10, title: "Five Senses Explorer",                platform: "Scratch" },
      { lessonNumber: 11, title: "Save the Earth! Recycling Story",     platform: "Scratch" },
      { lessonNumber: 12, title: "My Science Story Showcase",           platform: "Scratch" },
    ],
  },
  {
    moduleNumber: 3, moduleName: "Game Development", moduleEmoji: "🎮",
    lessons: [
      { lessonNumber: 1,  title: "Click the Cat! Intro to Games",       platform: "Scratch" },
      { lessonNumber: 2,  title: "Catch the Stars",                     platform: "Scratch" },
      { lessonNumber: 3,  title: "Avoid the Shark!",                    platform: "Scratch" },
      { lessonNumber: 4,  title: "Maze Runner",                         platform: "Scratch" },
      { lessonNumber: 5,  title: "Number Quiz Game",                    platform: "Scratch" },
      { lessonNumber: 6,  title: "Pong: Bouncing Ball",                 platform: "Scratch" },
      { lessonNumber: 7,  title: "Space Shooter",                       platform: "Scratch" },
      { lessonNumber: 8,  title: "Jumping Hero Platformer",             platform: "Scratch" },
      { lessonNumber: 9,  title: "Memory Match Cards",                  platform: "Scratch" },
      { lessonNumber: 10, title: "Colour Matching Game",                platform: "Scratch" },
      { lessonNumber: 11, title: "Add Sound, Polish & Power-Ups",       platform: "Scratch" },
      { lessonNumber: 12, title: "Game Dev Showcase: Present My Game!", platform: "Scratch" },
    ],
  },
  {
    moduleNumber: 4, moduleName: "App Development", moduleEmoji: "📱",
    lessons: [
      { lessonNumber: 1,  title: "What is an App?",                     platform: "Code.org App Lab" },
      { lessonNumber: 2,  title: "My First Button App",                 platform: "Code.org App Lab" },
      { lessonNumber: 3,  title: "Colour Changer App",                  platform: "Code.org App Lab" },
      { lessonNumber: 4,  title: "Animal Sounds App",                   platform: "Code.org App Lab" },
      { lessonNumber: 5,  title: "Greeting Card App",                   platform: "Code.org App Lab" },
      { lessonNumber: 6,  title: "Counter App",                         platform: "Code.org App Lab" },
      { lessonNumber: 7,  title: "Emoji Mood Tracker",                  platform: "Code.org App Lab" },
      { lessonNumber: 8,  title: "Simple Quiz App",                     platform: "Code.org App Lab" },
      { lessonNumber: 9,  title: "My Daily Routine App",                platform: "Code.org App Lab" },
      { lessonNumber: 10, title: "Choose Your Adventure Story App",     platform: "Code.org App Lab" },
      { lessonNumber: 11, title: "Fix My App! Debugging Challenge",     platform: "Code.org App Lab" },
      { lessonNumber: 12, title: "My App Showcase",                     platform: "Code.org App Lab" },
    ],
  },
  {
    moduleNumber: 5, moduleName: "Python Basics", moduleEmoji: "🐍",
    lessons: [
      { lessonNumber: 1,  title: "Hello Python! My First Program",      platform: "Trinket.io" },
      { lessonNumber: 2,  title: "Numbers & Maths in Python",           platform: "Trinket.io" },
      { lessonNumber: 3,  title: "Variables: Names for Things",         platform: "Trinket.io" },
      { lessonNumber: 4,  title: "Getting Input: Talk to Your Program", platform: "Trinket.io" },
      { lessonNumber: 5,  title: "If, Elif, Else: Make Decisions",      platform: "Trinket.io" },
      { lessonNumber: 6,  title: "Loops: For & While",                  platform: "Trinket.io" },
      { lessonNumber: 7,  title: "Python Turtle: Drawing with Code",    platform: "Trinket.io" },
      { lessonNumber: 8,  title: "Turtle Patterns & Flowers",           platform: "Trinket.io" },
      { lessonNumber: 9,  title: "Lists: Shopping with Python",         platform: "Trinket.io" },
      { lessonNumber: 10, title: "Functions: Teach Python New Tricks",  platform: "Trinket.io" },
      { lessonNumber: 11, title: "Python Playground: Mini Projects",    platform: "Trinket.io" },
      { lessonNumber: 12, title: "Python Showcase",                     platform: "Trinket.io" },
    ],
  },
  {
    moduleNumber: 6, moduleName: "Python Intermediate", moduleEmoji: "🐍⚡",
    lessons: [
      { lessonNumber: 1,  title: "Review & Robot Friend",               platform: "Trinket.io" },
      { lessonNumber: 2,  title: "Guess the Number Game",               platform: "Trinket.io" },
      { lessonNumber: 3,  title: "Dictionaries: Key-Value Pairs",       platform: "Trinket.io" },
      { lessonNumber: 4,  title: "String Magic",                        platform: "Trinket.io" },
      { lessonNumber: 5,  title: "Loops with Lists",                    platform: "Trinket.io" },
      { lessonNumber: 6,  title: "Build a Chatbot",                     platform: "Trinket.io" },
      { lessonNumber: 7,  title: "Turtle Spirals: Rainbow Art",         platform: "Trinket.io" },
      { lessonNumber: 8,  title: "Story Line by Line",                  platform: "Trinket.io" },
      { lessonNumber: 9,  title: "Rock, Paper, Scissors",               platform: "Trinket.io" },
      { lessonNumber: 10, title: "Simple Calculator",                   platform: "Trinket.io" },
      { lessonNumber: 11, title: "Story Generator",                     platform: "Trinket.io" },
      { lessonNumber: 12, title: "Intermediate Python Showcase",        platform: "Trinket.io" },
    ],
  },
  {
    moduleNumber: 7, moduleName: "Python Advanced", moduleEmoji: "🐍🔥",
    lessons: [
      { lessonNumber: 1,  title: "Nested Loops: Pyramids & Patterns",   platform: "Replit" },
      { lessonNumber: 2,  title: "Error Handling: Be Safe!",            platform: "Replit" },
      { lessonNumber: 3,  title: "Classes & Objects: Blueprint Magic",  platform: "Replit" },
      { lessonNumber: 4,  title: "Build a Pet Shop",                    platform: "Replit" },
      { lessonNumber: 5,  title: "Modules: Superpowers!",               platform: "Replit" },
      { lessonNumber: 6,  title: "Turtle Mandala",                      platform: "Trinket.io" },
      { lessonNumber: 7,  title: "Text-Based Adventure Game",           platform: "Replit" },
      { lessonNumber: 8,  title: "School Report Maker",                 platform: "Replit" },
      { lessonNumber: 9,  title: "Hangman Word Game",                   platform: "Replit" },
      { lessonNumber: 10, title: "Weather Advice App",                  platform: "Replit" },
      { lessonNumber: 11, title: "Digital Diary",                       platform: "Replit" },
      { lessonNumber: 12, title: "Advanced Python Showcase",            platform: "Replit" },
    ],
  },
  {
    moduleNumber: 8, moduleName: "CodiMath", moduleEmoji: "🔢",
    lessons: [
      { lessonNumber: 1,  title: "Count with Code: Number Line",        platform: "Scratch" },
      { lessonNumber: 2,  title: "Addition Machine",                    platform: "Scratch" },
      { lessonNumber: 3,  title: "Multiplication Tables Chant",         platform: "Scratch" },
      { lessonNumber: 4,  title: "Shape Area Calculator",               platform: "Scratch" },
      { lessonNumber: 5,  title: "Odd or Even? Sorting Machine",        platform: "Scratch" },
      { lessonNumber: 6,  title: "Fraction Pizza Party",                platform: "Scratch" },
      { lessonNumber: 7,  title: "Patterns & Skip Counting",            platform: "Scratch" },
      { lessonNumber: 8,  title: "Timed Maths Quiz",                    platform: "Scratch" },
      { lessonNumber: 9,  title: "Ruler & Measurement Tool",            platform: "Scratch" },
      { lessonNumber: 10, title: "Clock Reading Practice",              platform: "Scratch" },
      { lessonNumber: 11, title: "Maths Story: The Number Kingdom",     platform: "Scratch" },
      { lessonNumber: 12, title: "CodiMath Showcase: My Maths Tool",   platform: "Scratch" },
    ],
  },
  {
    moduleNumber: 9, moduleName: "HTML & CSS", moduleEmoji: "🌐",
    lessons: [
      { lessonNumber: 1,  title: "How Websites Work",                   platform: "Code.org Web Lab" },
      { lessonNumber: 2,  title: "Headings & Paragraphs",              platform: "Code.org Web Lab" },
      { lessonNumber: 3,  title: "Lists: Bullet & Numbered",           platform: "Code.org Web Lab" },
      { lessonNumber: 4,  title: "Adding Images",                      platform: "Code.org Web Lab" },
      { lessonNumber: 5,  title: "Links: Connecting Pages",            platform: "Code.org Web Lab" },
      { lessonNumber: 6,  title: "CSS: Making it Colourful!",          platform: "Code.org Web Lab" },
      { lessonNumber: 7,  title: "CSS: Fonts & Text Styling",          platform: "Code.org Web Lab" },
      { lessonNumber: 8,  title: "CSS: Boxes & Borders",               platform: "Code.org Web Lab" },
      { lessonNumber: 9,  title: "Page Layout: Dividing the Screen",   platform: "Code.org Web Lab" },
      { lessonNumber: 10, title: "Forms: Getting Feedback",            platform: "Code.org Web Lab" },
      { lessonNumber: 11, title: "My Website: Putting It Together",    platform: "Code.org Web Lab" },
      { lessonNumber: 12, title: "Web Showcase: My First Website!",    platform: "Code.org Web Lab" },
    ],
  },
  {
    moduleNumber: 10, moduleName: "JavaScript", moduleEmoji: "⚡",
    lessons: [
      { lessonNumber: 1,  title: "Hello JavaScript!",                  platform: "Khan Academy" },
      { lessonNumber: 2,  title: "Variables & Values",                 platform: "Khan Academy" },
      { lessonNumber: 3,  title: "Maths in JavaScript",               platform: "Khan Academy" },
      { lessonNumber: 4,  title: "Drawing with JavaScript",            platform: "Khan Academy" },
      { lessonNumber: 5,  title: "Animations: Making Things Move",     platform: "Khan Academy" },
      { lessonNumber: 6,  title: "Conditionals in JavaScript",         platform: "Khan Academy" },
      { lessonNumber: 7,  title: "JavaScript Loops",                   platform: "Khan Academy" },
      { lessonNumber: 8,  title: "Functions: Reusable Drawing",        platform: "Khan Academy" },
      { lessonNumber: 9,  title: "Mouse Events: Interactive Art",      platform: "Khan Academy" },
      { lessonNumber: 10, title: "Arrays in JavaScript",               platform: "Khan Academy" },
      { lessonNumber: 11, title: "Objects in JavaScript",              platform: "Khan Academy" },
      { lessonNumber: 12, title: "JavaScript Showcase",                platform: "Khan Academy" },
    ],
  },
  {
    moduleNumber: 11, moduleName: "Capstone Project", moduleEmoji: "🏆",
    lessons: [
      { lessonNumber: 1,  title: "Capstone Kickoff: Planning",         platform: "All Platforms" },
      { lessonNumber: 2,  title: "Story: Script & Storyboard",         platform: "Scratch" },
      { lessonNumber: 3,  title: "Story Build: Scenes 1–3",            platform: "Scratch" },
      { lessonNumber: 4,  title: "Story Build: Scenes 4–5 + Sound",   platform: "Scratch" },
      { lessonNumber: 5,  title: "Game: Design Document",              platform: "Scratch" },
      { lessonNumber: 6,  title: "Game Build: Core Mechanics",         platform: "Scratch" },
      { lessonNumber: 7,  title: "Game Build: Polish & Level 2",       platform: "Scratch" },
      { lessonNumber: 8,  title: "App Planning & Build Part 1",        platform: "Code.org App Lab" },
      { lessonNumber: 9,  title: "App Build Part 2 + Logic",           platform: "Code.org App Lab" },
      { lessonNumber: 10, title: "Website Build Part 1",               platform: "Code.org Web Lab" },
      { lessonNumber: 11, title: "Website Build Part 2 + CSS",         platform: "Code.org Web Lab" },
      { lessonNumber: 12, title: "🏆 Grand Showcase: PearlX Graduation!", platform: "All Platforms" },
    ],
  },
];

/**
 * Seeds all curriculum data into Firestore.
 * Call this once from the admin panel — it checks for existing data first.
 * @returns {{ seeded: number, skipped: number }}
 */
export async function seedCurriculumToFirestore(onProgress) {
  const categories = ["little_pearls", "bright_pearls", "rising_pearls"];
  let seeded = 0, skipped = 0;

  for (const category of categories) {
    // Fetch ALL existing modules for this category in one query (no composite index needed)
    const existingSnap = await getDocs(
      query(collection(db, "curriculum"), where("category", "==", category))
    );
    const existingModuleNumbers = new Set(
      existingSnap.docs.map(d => d.data().moduleNumber)
    );

    for (const mod of MODULES_SEED) {
      // Check in JS — no compound Firestore query needed
      if (existingModuleNumbers.has(mod.moduleNumber)) { skipped++; continue; }

      const lessons = mod.lessons.map((l, idx) => ({
        id: `${category}_m${mod.moduleNumber}_l${l.lessonNumber}`,
        lessonNumber: l.lessonNumber,
        title: l.title,
        platform: l.platform,
        description: "",
        notes: "",
        pptLink: "",
      }));

      await addDoc(collection(db, "curriculum"), {
        category,
        moduleNumber: mod.moduleNumber,
        moduleName: mod.moduleName,
        moduleEmoji: mod.moduleEmoji,
        lessons,
        createdAt: serverTimestamp(),
      });

      seeded++;
      onProgress?.(`Seeded: ${category} → Module ${mod.moduleNumber}`);
    }
  }

  return { seeded, skipped };
}

/** Fetch all modules for a given category, ordered by moduleNumber */
export async function fetchCurriculumForCategory(category) {
  const snap = await getDocs(
    query(collection(db, "curriculum"), where("category", "==", category))
  );
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => a.moduleNumber - b.moduleNumber);
}