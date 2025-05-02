"use client"
import { ACTIVITIES } from '@/data/activity'
import { useState } from 'react'
import ActivityCard from './Activity'
import ActivityDetail from './ActivityDetails'


export default function VisualPane() {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null)
  
  // Handle clicking on an activity card
  const handleActivitySelect = (index: number) => {
    setSelectedActivity(index)
  }
  
  // Handle going back to the activity list
  const handleBackToList = () => {
    setSelectedActivity(null)
  }
  
  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {selectedActivity === null ? (
        // Show list of activities
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Recommended Activities</h2>
          <div className="grid gap-4">
            {ACTIVITIES.map((activity, index) => (
              <div 
                key={index}
                onClick={() => handleActivitySelect(index)}
                className="cursor-pointer transition-transform hover:scale-[1.01]"
              >
                <ActivityCard 
                  activity={activity} 
                  day={index + 1} 
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Show detailed view of selected activity
        <div className="p-4">
          <button 
            onClick={handleBackToList}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to activities
          </button>
          
          <ActivityDetail
            title={ACTIVITIES[selectedActivity].title}
            image={ACTIVITIES[selectedActivity].image}
            location={ACTIVITIES[selectedActivity].location}
            description={ACTIVITIES[selectedActivity].description}
            tags={ACTIVITIES[selectedActivity].tags}
          />
        </div>
      )}
    </div>
  )
}