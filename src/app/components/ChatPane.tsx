"use client"
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import travelAnimation from '../../../public/travel.json';




type ChatPaneProps = {
  messages: Array<{ type: 'user' | 'assistant'; text: string }>;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
};

export default function ChatPane({
  messages,
  inputValue,
  onInputChange,
  onSendMessage,
}: ChatPaneProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatMessageText = (text: string) => {
    if (text.includes('\n')) {
      const parts = text.split('\n');
      return parts.map((part, index) => {
        if (part.trim().startsWith('•')) {
          return <li key={index} className="ml-5">{part.replace('•', '').trim()}</li>;
        } else if (part.endsWith(':')) {
          return <p key={index} className="mt-2 font-semibold">{part}</p>;
        } else {
          return part.trim() ? <p key={index} className={index > 0 ? "mt-2" : ""}>{part}</p> : null;
        }
      });
    }
    return <p>{text}</p>;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  // Determine if we should center the input (large screen + no messages)
  const isLargeScreen = windowWidth >= 1024; // lg breakpoint
  const shouldCenterInput = isLargeScreen && messages.length === 0;
  
  // Welcome message to show at start
  const welcomeMessage = "Hello traveler! Ready to explore the world? Let's plan your dream vacation to Japan and make unforgettable memories!";

  return (
    <div className="h-screen flex flex-col bg-gray-50 relative">
      {/* Scrollable Messages Container */}
      <div className={`${shouldCenterInput ? 'flex-1' : 'flex-1 overflow-y-auto'} p-4 space-y-4`}>
        {messages.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center h-full">
            <div className="w-32 h-32 mb-6">
  <Lottie animationData={travelAnimation} loop={true} />
</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">TravelBuddy AI</h1>
            <p className="text-center text-gray-600 max-w-lg mb-8 px-4 pb-20">{welcomeMessage}</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'assistant' && (
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm mr-2 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
              </div>
            )}
            
            <div
              className={`rounded-lg p-3 max-w-xs md:max-w-md lg:max-w-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
              }`}
            >
              {message.type === 'user' && (
                <p className="text-xs text-blue-100 mb-1">User</p>
              )}
              
              {formatMessageText(message.text)}
            </div>
            
            {message.type === 'user' && (
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm ml-2 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area - Centered for large screens at start, fixed at bottom otherwise */}
      <div 
        className={`
          ${shouldCenterInput ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-20 w-full max-w-2xl px-4' : 'border-t p-4 bg-white sticky bottom-0 w-full shadow-md'}
        `}
      >
        <div className={`flex ${shouldCenterInput ? 'shadow-lg rounded-lg overflow-hidden' : ''}`}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 border rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={onSendMessage}
            className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition flex items-center justify-center"
            disabled={!inputValue.trim()}
          >
            <span>Send</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
        
        {shouldCenterInput && (
          <p className="text-center text-gray-500 mt-4 text-sm">
            Start your travel conversation with our AI assistant
          </p>
        )}
      </div>
    </div>
  );
} 