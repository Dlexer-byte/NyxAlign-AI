import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, message]);
      setMessage('');
    }
  };

  // Handle Enter key to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-12 flex-grow flex flex-col max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#0A81D1] to-[#00D4FF] animate-pulse">
          Chat with NyxAlign AI
        </h1>
        
        <div className="bg-[#2E2E4A]/80 backdrop-blur-md p-6 rounded-xl mb-6 flex-grow overflow-y-auto shadow-lg border border-[#0A81D1]/20 transition-all duration-300 hover:shadow-[#0A81D1]/30">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="mb-3 p-3 bg-[#1A1A2E]/90 rounded-lg shadow-sm border-l-4 border-[#0A81D1] animate-slide-in"
            >
              {msg}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow p-3 bg-[#2E2E4A]/50 border border-[#0A81D1]/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A81D1] focus:border-transparent transition-all duration-200"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-3 bg-gradient-to-r from-[#0A81D1] to-[#00D4FF] rounded-lg hover:from-[#00D4FF] hover:to-[#0A81D1] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Send
          </button>
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
