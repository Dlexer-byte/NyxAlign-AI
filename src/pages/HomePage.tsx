import React, { useState } from 'react';
import { signInWithGoogle } from '../lib/supabase'; // Named export
import Header from '../components/Header';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    const { error } = await signInWithGoogle('/dashboard');
    if (error) {
      console.error('Google auth error:', error.message);
    }
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#1A1A2E] to-[#2E2E4A] text-white"
      style={{ backgroundSize: '400% 400%' }}
    >
      <Header
        rightButton={{
          text: isLoading ? 'Connecting...' : (
            <>
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google Icon"
                className="inline-block w-4 mr-2"
              />
              Sign up / Login with Google
            </>
          ),
          onClick: handleGoogleAuth,
        }}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="hero text-center">
          <h1 className="text-5xl font-bold mb-6">
            Reclaim Your Time with AI Agents
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            NyxAlign AI automates your scheduling, email management, reminders, and tasks, giving you hours back to live your life.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleGoogleAuth}
              className="px-6 py-3 bg-[#0A81D1] rounded-md hover:bg-[#00D4FF] transition-colors"
            >
              {isLoading ? 'Connecting...' : 'Get Started'}
            </button>
            <a
              href="#video-section"
              className="px-6 py-3 border border-[#0A81D1] rounded-md hover:bg-[#00D4FF] transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            See NyxAlign AI in Action
          </h2>
          <div id="video-section" className="flex justify-center">
            <iframe
              width="800"
              height="450"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="NyxAlign AI Demo"
              className="rounded-lg border-4 border-white"
            />
          </div>
        </div>
        <div className="mt-20 bg-white text-black p-10 rounded-lg max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">The Power of AI Agents</h2>
          <p className="text-lg">
            AI agents don't just assist—they truly understand you. NyxAlign AI harnesses groundbreaking reasoning technology and advanced memory technology, allowing it to remember your preferences and past interactions, mirroring human intuition to masterfully manage your schedule, tame the chaos of overflowing inboxes, and prioritize your tasks with uncanny precision. This isn't just automation—it's a revolution, reclaiming your hours and restoring balance to your life with effortless elegance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
