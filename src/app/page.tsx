'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import ClearChatButton from '@/components/ClearChatButton';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isUser: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm AI ChatBot, Ask me anything!",
      isUser: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    const userMessage: Message = { role: 'user', content: message, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    // Set loading state
    setIsLoading(true);

    try {
      // Send message to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Add AI response to chat
      const aiMessage: Message = {
        role: 'assistant',
        content: data.response,
        isUser: false
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      // Add fallback error message from AI
      const errorMessage: Message = {
        role: 'assistant',
        content: "Oops! Something went wrong. Please try again later.",
        isUser: false
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "So sad you clear our chat, chat with me again!",
        isUser: false
      }
    ]);
  };

  return (
    <main className="flex flex-col h-screen bg-gray-200">
      {/* Header Section */}
      <div className="bg-gray-600 text-white p-4">
        <h1 className="text-2xl font-bold">AI Chatbot v.2</h1>
        <h2 className="text-lg font-semibold ml-8">Google Gemini Free Key</h2>
        <hr className="my-1" />
        <h3>Produced by @boss_emeraldd</h3>
      </div>

      {/* Chat Messages Section */}
      <div className="flex-grow overflow-y-scroll py-3 px-7">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.content} isUser={message.isUser} />
        ))}
        {isLoading && (
          <div className="flex justify-start my-4">
            <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input & Clear Button Section */}
      <div className="bg-gray-500 p-4 flex items-center justify-between">
        <ClearChatButton onClearChat={handleClearChat} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </main>
  );
}
