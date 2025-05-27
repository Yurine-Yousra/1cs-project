const KEYWORDS = [
  "snow",
  "sunset",
  "ocean",
];

 function getRandomKeyword(): string {
  const index = Math.floor(Math.random() * KEYWORDS.length);
  return KEYWORDS[index];
}

export {getRandomKeyword}