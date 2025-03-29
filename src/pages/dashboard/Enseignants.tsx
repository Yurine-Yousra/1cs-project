import { GrAddCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Card from "../../components/cards/TeacherCard";

const Enseignants: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-[90%] p-4 m-auto">

        <div className="flex w-full justify-between items-center ">
          {/* Filtres */}
          <div className="flex items-center gap-6 w-full ">
            {/* Ordre */}

            {/* Filtre */}
            <div className="flex  items-center justify-between gap-4  w-full">
            <h2 className="text-lg font-semibold mb-4 pt-3">Liste des Enseignants</h2>
            <div className="flex  items-center gap-2">
            <select id="filtre" className="border border-[var(--color-yousra)] p-1.5 rounded-full text-[var(--color-yousra)] w-[120px] text-[15px]">
                <option value="alphabet">Alphabet</option>
                <option value="age">Âge</option>
              </select>
                {/* Bouton Ajouter */}
         
            </div> <button
            className="flex items-center gap-2 bg-[var(--color-yousra)] text-white px-4 py-2 rounded-full shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200"
            onClick={() => navigate("/dashboard/addTeacher")}
          >
            <span>Nouveau</span> <GrAddCircle />
          </button>
            </div>
          </div>  
        </div>
      </div>
      {/* Grid of Cards */}
      <div className="w-[90%] m-auto grid grid-cols-3 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Enseignants;
