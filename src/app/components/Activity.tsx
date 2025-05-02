import Image from 'next/image'

type Activity = {
  title: string
  image: string
  location: string
  description: string
  tags: string[]
}

type Props = {
  activity: Activity
  day: number
}

export default function ActivityCard({ activity, day }: Props) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-96">
        <Image 
          src={activity.image} 
          alt={activity.title}
          className="object-cover"
          fill
        />
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs font-semibold rounded">
          Day {day}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg">{activity.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{activity.location}</p>
        <p className="text-gray-800 mt-2 text-sm">{activity.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {activity.tags.map(tag => (
            <span 
              key={tag} 
              className="bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}