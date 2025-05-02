"use client"
import { useState } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'

type ActivityDetailProps = {
  title: string
  image: string
  location: string
  description: string
  rating?: number
  reviews?: number
  tags?: string[]
}

export default function ActivityDetail({ 
  title, 
  image, 
  location, 
  description,
  rating = 4.8,
  reviews = 315,
}: ActivityDetailProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabContents = {
    overview: (
      <div className="py-4">
        <p className="text-gray-800">
          {title} offers a thrilling, unforgettable way to explore {location}. It&apos;s a perfect mix of excitement&lsquo; local pop culture&lsquo; and urban adventure—great for first-time visitors craving a unique experience.
        </p>
        <p className="mt-3 text-gray-800">
          {description}
        </p>
      </div>
    ),
    guides: (
      <div className="py-4">
        <p className="text-gray-800">Available rental guides include:</p>
        <ul className="mt-3 list-disc pl-5">
          <li className="text-gray-800">Basic Safety & Driving Guide (15 min)</li>
          <li className="text-gray-800">Shibuya Route Tour (1 hour)</li>
          <li className="text-gray-800">Photo Stop Tour with Local Host (1.5 hours)</li>
        </ul>
      </div>
    ),
    activities: (
      <div className="py-4">
        <p className="text-gray-800">Popular activities:</p>
        <ul className="mt-3 list-disc pl-5">
          <li className="text-gray-800">Go-Karting through Shibuya Crossing</li>
          <li className="text-gray-800">Cosplay Costume Ride</li>
          <li className="text-gray-800">Photo Ops with Tokyo Tower in Background</li>
        </ul>
      </div>
    ),
    tours: (
      <div className="py-4">
        <div className="border rounded-lg p-3 mb-3">
          <h3 className="font-semibold">Shibuya Night Ride</h3>
          <p className="text-gray-700 text-sm">60-minute guided karting tour with costume rental</p>
          <p className="text-gray-900 font-medium mt-2">¥8,000 per person</p>
        </div>
        <div className="border rounded-lg p-3">
          <h3 className="font-semibold">Cosplay Tokyo Adventure</h3>
          <p className="text-gray-700 text-sm">Dress up and ride around famous Tokyo spots</p>
          <p className="text-gray-900 font-medium mt-2">¥10,500 per person</p>
        </div>
      </div>
    ),
    reviews: (
      <div className="py-4">
        <div className="border-b pb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-semibold">L</div>
            <div className="ml-2">
              <p className="font-medium">Lena M.</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-800 mt-2 text-sm">Absolutely wild and fun! We drove through real traffic in Shibuya—felt like movie stars!</p>
        </div>
        <div className="pt-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 font-semibold">J</div>
            <div className="ml-2">
              <p className="font-medium">James R.</p>
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
                <Star size={14} className="text-gray-300" />
              </div>
            </div>
          </div>
          <p className="text-gray-800 mt-2 text-sm">Really fun, but traffic can be intimidating. Worth doing once for sure!</p>
        </div>
      </div>
    ),
    location: (
      <div className="py-4">
        <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Map view of {location}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-medium text-gray-900">Address:</h3>
          <p className="text-gray-800">Shibuya Crossing, Tokyo, Japan</p>
          <h3 className="font-medium text-gray-900 mt-3">Getting There:</h3>
          <p className="text-gray-800">Closest Station: Shibuya (Hachiko Exit – 2 min walk)</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative h-96">
        <Image 
          src={image} 
          alt={title}
          className="object-cover "
          fill
        />
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <Star className="text-yellow-400 fill-yellow-400 h-5 w-5" />
            <span className="ml-1 text-gray-700">{rating}</span>
          </div>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-600">{reviews} reviews</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-600">{location}</span>
        </div>

        <div className="flex items-center mt-2">
          <span className="text-gray-600">Adventure</span>
        </div>

        <div className="flex mt-4 border-b">
          {['Overview', 'Guides', 'Activities', 'Tours', 'Reviews', 'Location'].map((tab) => {
            const lowercaseTab = tab.toLowerCase()
            const isActive = activeTab === lowercaseTab

            return (
              <button
                key={tab}
                className={`px-4 py-2 font-medium ${
                  isActive 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab(lowercaseTab)}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {tabContents[activeTab as keyof typeof tabContents]}
      </div>
    </div>
  )
}
