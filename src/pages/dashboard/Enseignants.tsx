import { GrAddCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";

const Enseignants: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-[90%] bg-white p-4 m-auto mb-10 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Liste des Enseignants</h2>

        <div className="flex w-[90%] justify-between items-center">
          {/* Filtres */}
          <div className="flex items-center gap-6">
            {/* Ordre */}
            <div className="flex flex-col items-start">
              <label htmlFor="ordre" className="text-gray-700 font-medium">Ordre</label>
              <select id="ordre" className="border border-[var(--color-yousra)] p-1 rounded-md">
                <option value="croissant">Croissant</option>
                <option value="décroissant">Décroissant</option>
              </select>
            </div>

            {/* Filtre */}
            <div className="flex flex-col items-start">
              <label htmlFor="filtre" className="text-gray-700 font-medium">Filtre</label>
              <select id="filtre" className="border border-[var(--color-yousra)] p-1 rounded-md">
                <option value="alphabet">Alphabet</option>
                <option value="age">Âge</option>
              </select>
            </div>
          </div>

          {/* Bouton Ajouter */}
          <button
            className="flex items-center gap-2 bg-[var(--color-yousra)] text-white px-4 py-2 rounded-md shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200"
            onClick={() => navigate("/dashboard/addTeacher")}
          >
            <GrAddCircle /> <span>Ajouter un Enseignant</span>
          </button>
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
      </div>
    </div>
  );
};

export default Enseignants;
