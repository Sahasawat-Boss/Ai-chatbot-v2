'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import RefreshButton from "@/components/RefreshButton";
import ClearChatButton from '@/components/ClearChatButton';
import ProfileIcon from "@/components/ProfileIcon";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isUser: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm AI Chatbot, Ask me anything!",
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
    const userMessage: Message = { role: 'user', content: message, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [userMessage], // ✅ Only send user messages, ignore assistant's initial message
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const aiMessage: Message = {
        role: 'assistant',
        content: data.response,
        isUser: false
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "API has request limits, Please try again later",
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Chat is cleared, Try chatting with me again!",
        isUser: false
      }
    ]);
  };

  return (
    <main className="flex flex-col h-screen bg-gray-300">
      {/* Header Section */}
      <div className="bg-gray-700 text-white p-4 flex shadow-lg">
        <div className='min-w-[80%]'>
          <h1 className="text-2xl font-bold animate-fade-in-down">AI Chatbot v.2</h1>
          <hr className="my-1" />
          <h3 className="text-center animate-fade-in-down">Created by @boss_emeraldd</h3>
        </div>
        <div className='w-full flex item-center justify-center'>
          <ProfileIcon />
        </div>
      </div>

      {/* Chat Messages Section */}
      <div className="flex-grow overflow-y-auto py-3 px-7 animate-fade-in-left">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.content} isUser={message.isUser} />
        ))}
        {isLoading && (
          <div className="flex justify-start my-4">
            <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input & Button Section */}
      <div className="bg-gray-700 p-4 flex flex-col">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        <div className='flex justify-center gap-2 pb-5'>
          <RefreshButton />
          <ClearChatButton onClearChat={handleClearChat} />
        </div>
      </div>

    </main>
  );
}
