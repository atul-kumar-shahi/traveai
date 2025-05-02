"use client"
import { useState } from 'react'
import ChatPane from './components/ChatPane'
import VisualPane from './components/VisualPane'

type MessageType = {
  type: 'user' | 'assistant';
  text: string;
}

export default function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('Hi! I\'m planning a trip to Japan. Can you help me?');
  const [showActivities, setShowActivities] = useState(false);
  
  // Pre-defined assistant responses
  const assistantResponses = [
    "Hello! I'd be happy to help with your Japan trip. Which cities or areas are you planning to explore?",
    "Excellent picks! Tokyo and Kyoto are both incredible cities with unique experiences. How many days do you plan to stay in each?",
    "Here are some top activities and attractions to consider during your Japan adventure:\n\nTokyo:\n• Shibuya Crossing\n• Senso-ji Temple\n• TeamLab Planets\n\nKyoto:\n• Fushimi Inari Taisha\n• Arashiyama Bamboo Grove\n• Kiyomizu-dera Temple\n\nYou can view details for each activity in the panel on the right."
  ];
  
  
  const nextMessages = [
    "I'm thinking of visiting Tokyo and Kyoto. What do you recommend?",
    "2 days in each city. Suggest activities",
    "Tell me more about Fushimi Inari Taisha"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMessages: MessageType[] = [...messages, { type: 'user', text: inputValue }];
    setMessages(newMessages);
    
    // Determine which assistant response to show
    const assistantIndex = Math.min(Math.floor(newMessages.length / 2), assistantResponses.length - 1);
    
    // Add assistant response after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        text: assistantResponses[assistantIndex] 
      }]);
      
      // Show activities panel if the user asked for activity suggestions
      if (inputValue.toLowerCase().includes('suggest activities')) {
        setShowActivities(true);
      }
      
      // Set up next message
      if (assistantIndex < nextMessages.length) {
        setInputValue(nextMessages[assistantIndex]);
      } else {
        setInputValue('');
      }
    }, 1000);
    
    // Clear input field immediately after sending
    setInputValue('');
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className={`${showActivities ? "md:w-1/2" : "w-full"} border-b md:border-b-0 md:border-r`}>
        <ChatPane 
          messages={messages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSendMessage={handleSendMessage}
        />
      </div>
      {showActivities && (
        <div className="md:w-1/2 w-full h-full overflow-y-auto">
          <VisualPane />
        </div>
      )}
    </div>
  );
  
}