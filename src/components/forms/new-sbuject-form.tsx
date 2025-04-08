import { ChevronDown } from "lucide-react"

export default function NewSubjectForm() {
  return (
    <div className="bg-white p-6  max-w-96 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">Nouvelle Matière:</h2>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Titre"
          />
        </div>

        <div className="relative">
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
            defaultValue=""
          >
            <option value="" disabled>
              Enseignant
            </option>
            <option value="mr-fadhil">Mr.Fadhil</option>
            <option value="mr-cyril">Mr.Cyril</option>
            <option value="mme-otaumy">Mme.Otaumy</option>
            <option value="mr-ahmed">Mr.Ahmed</option>
            <option value="mme-sophie">Mme.Sophie</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Coef"
              min="1"
              max="10"
            />
          </div>

          <div className="w-1/2">
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="nbr.heures"
              min="1"
              max="20"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
