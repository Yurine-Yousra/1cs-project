import { SchoolLevelCode, SchoolLevelName } from "../types/register.type";




interface SchoolLevelsMap {
  Primaire: 1;
  Moyenne: 2;
  Secondaire: 3;
}

const levels: SchoolLevelsMap = {
  Primaire: 1,
  Moyenne: 2,
  Secondaire: 3
};

export const getSchoolLevelCode = (levelName: SchoolLevelName): SchoolLevelCode | null => {
  return levels[levelName] || null;
};


// Map for specialization names
export const specializationMap: Record<number, string> = {
  1: "Science",
  2: "Lettres",
  3: "Gestion et Économie",
  4: "Mathématiques",
  5: "Sciences Expérimentales",
  6: "Technique Mathématiques - Génie Civil",
  7: "Technique Mathématiques - Génie Électrique",
  8: "Technique Mathématiques - Génie Mécanique",
  9: "Lettres et Philosophie",
  10: "Langues Etrangeres",
};



// Map for school level names
export const schoolLevelMap: Record<number, string> = {
  10: "1 ére",
  11: "2 éme",
  12: "3 éme",
}