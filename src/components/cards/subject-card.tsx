import { MoreVertical } from "lucide-react"

interface SubjectCardProps {
  title: string
  teacher: string
  coefficient: number
  hours: number
  color: "indigo" | "amber" | "red"
}

export default function SubjectCard({ title, teacher, coefficient, hours, color }: SubjectCardProps) {
  const colorClasses = {
    indigo: "bg-indigo-600",
    amber: "bg-amber-500",
    red: "bg-red-500",
  }

  return (
    <div className="bg-white rounded-lg  shadow-sm overflow-hidden">
      <div className="flex items-stretch">
        <div className={`w-2 ${colorClasses[color]}`}></div>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">{title}</h3>
              <div className="text-sm text-black mt-1">
                <div className="text-gray">Enseignant</div>
                <div>{teacher}</div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-gray-500 text-sm">Coefficient</div>
                <div className="font-medium">{coefficient}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-sm">Heurs par semaine</div>
                <div className="font-medium">{hours} Heures</div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
