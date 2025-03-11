import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import supabase from '../lib/supabase';

const Dashboard: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fetch session on mount
  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) console.error('Session error:', error.message);
      else if (session) {
        setSessionId(session.user.id);
        setAccessToken(session.provider_token);
        console.log('Session ID:', session.user.id, 'Access Token:', session.provider_token);
      }
    };
    getSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setSessionId(session.user.id);
        setAccessToken(session.provider_token);
        console.log('Signed in - Session ID:', session.user.id, 'Access Token:', session.provider_token);
      }
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !accessToken || !sessionId) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Please log in to use this feature.' }]);
      return;
    }

    const payload = {
      message: message.trim(),
      sessionId,
      type: 'text',
      accessToken,
    };

    try {
      const response = await fetch(
        'https://primary-production-d226.up.railway.app/webhook/4fbb95d5-4413-4d9a-984f-77d26990e06d',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      const botMessage = data.response || 'No response from server';

      setMessages(prev => [...prev, { sender: 'user', text: message.trim() }, { sender: 'bot', text: botMessage }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { sender: 'user', text: message.trim() }, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    }
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage();
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
              <span className="font-bold">{msg.sender === 'user' ? 'You' : 'NYXAlign AI'}: </span>
              {msg.text}
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
            placeholder="Type your message (e.g., Summarize my latest email or Send an email to...)"
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-3 bg-gradient-to-r from-[#0A81D1] to-[#00D4FF] rounded-lg hover:from-[#00D4FF] hover:to-[#0A81D1] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Send
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Dashboard;
