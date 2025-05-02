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
  
    return (
      <div className="h-screen flex flex-col bg-white">
        {/* Scrollable Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start ${message.type === 'user' ? 'justify-end' : ''}`}
            >
              <div
                className={`rounded-lg p-3 max-w-xs md:max-w-md ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {formatMessageText(message.text)}
              </div>
            </div>
          ))}
        </div>
  
        {/* Input Area Fixed at Bottom */}
        <div className="border-t p-4 bg-white sticky bottom-0 w-full">
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={onSendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
  