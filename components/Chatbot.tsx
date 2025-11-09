
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { streamChatMessages } from '../services/geminiService';
import { ChatMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (input.trim() === '' || isLoading) return;

    const newUserMessage: ChatMessage = { id: uuidv4(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    const newGeminiMessage: ChatMessage = { id: uuidv4(), text: '', sender: 'gemini', loading: true };
    setMessages((prev) => [...prev, newGeminiMessage]);

    try {
      let fullResponse = '';
      for await (const chunk of streamChatMessages([...messages, newUserMessage])) {
        fullResponse += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newGeminiMessage.id ? { ...msg, text: fullResponse, loading: false } : msg
          )
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newGeminiMessage.id ? { ...msg, text: 'Error: Could not get a response.', loading: false } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }, [sendMessage]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end`}>
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 md:w-96 h-[400px] flex flex-col border border-gray-200 mb-4 animate-fade-in-up">
          <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Gemini Chatbot</h3>
            <button onClick={onToggle} className="text-white hover:text-gray-200 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                  {msg.loading && (
                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-gray-500 animate-pulse"></span>
                  )}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-200 flex items-center">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Ask Gemini anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              disabled={isLoading || input.trim() === ''}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <button
        onClick={onToggle}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
