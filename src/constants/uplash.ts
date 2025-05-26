const KEYWORDS = [
  "snow",
  "forest",
  "beach",
  "mountains",
  "river",
  "desert",
  "sunset",
  "sky",
  "ocean",
  "waterfall",
  "lake",
  "flowers",
  "trees",
  "valley",
  "nature"
];

 function getRandomKeyword(): string {
  const index = Math.floor(Math.random() * KEYWORDS.length);
  return KEYWORDS[index];
}

export {getRandomKeyword}