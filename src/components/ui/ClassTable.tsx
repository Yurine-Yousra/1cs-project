
import { classes } from "../../types/users.constant";

const getBadgeColor = (type: string) => {
  switch (type) {
    case "success":
      return "bg-green-400";
    case "danger":
      return "bg-red-400";
    default:
      return "bg-gray-300";
  }
};

const ClassCard = () => {
  return (
    <div className="bg-[#F4F5FF] p-6 rounded-lg px-10">
    {/* Header */}
    <div className="grid grid-cols-6 bg-white p-4   text-gray-700  font-semibold rounded-t-lg">
      <div>Classe</div>
      <div></div>
      <div>Enseign Responsable</div>
      <div></div>
      <div className="text-center">Effectif</div>
      <div className="text-center">Moyenne</div>
    </div>

    {/* Cards */}
    <div className="flex flex-col gap-3 mt-5">
      {classes.map((cls, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          {/* Classe Column */}
          <div className="flex items-center gap-3 w-1/3">
            <div className="flex -space-x-2">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/women/2.jpg"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <span className="flex items-center justify-center w-8 h-8 bg-yousra text-white text-xs font-semibold rounded-full">
                +{cls.count}
              </span>
            </div>
            <span>{cls.name}</span>
          </div>

          {/* Teacher Column */}
          <div className="w-1/3">{cls.teacher}</div>

          {/* Students Count */}
          <div className="text-center w-1/6">{cls.students}</div>

          {/* Average Score */}
          <div className="text-center w-1/6">
            <span
              className={`px-4 py-1 text-white text-sm font-semibold rounded-full ${getBadgeColor(
                cls.averageType
              )}`}
            >
              {cls.average}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ClassCard;
