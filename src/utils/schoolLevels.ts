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

