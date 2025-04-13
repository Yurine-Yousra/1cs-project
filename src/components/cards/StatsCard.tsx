interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: React.ElementType
}

export function StatsCard({ title, value, description, icon: Icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between space-x-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
        <div className="bg-sous p-3 rounded-full">
          <Icon className="h-6 w-6 text-yousra" />
        </div>
      </div>
    </div>
  )
}
