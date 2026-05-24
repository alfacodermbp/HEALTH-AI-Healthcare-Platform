'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { api } from '@/lib/api';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([
    { text: "Hi! I'm your AI Health Guide. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => m.text);
      const res = await api.post('/chat', { message: userMsg, history });
      if (res.data.success) {
        setMessages(prev => [...prev, { text: res.data.reply, isBot: true }]);
      }
    } catch (e) {
       setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting to the server.", isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-16 w-16 bg-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-primary-700 hover:scale-105 transition-all z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageCircle className="h-8 w-8" />
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
        </span>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-full max-w-sm sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all origin-bottom-right z-50 ${isOpen ? 'scale-100 opacity-100 h-[500px]' : 'scale-0 opacity-0 h-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-primary-600 p-4 text-white flex justify-between items-center shadow-md z-10">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-lg">
               <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold">AI Health Guide</h3>
              <p className="text-xs text-primary-100">Usually replies instantly</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-primary-100 hover:text-white transition-colors hover:bg-white/10 p-1 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
          {messages.map((msg, i) => (
             <div key={i} className={`flex max-w-[85%] ${msg.isBot ? 'self-start' : 'self-end'}`}>
               <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                 msg.isBot ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100' : 'bg-primary-600 text-white rounded-tr-none'
               }`}>
                 {msg.text}
               </div>
             </div>
          ))}
          {loading && (
             <div className="flex max-w-[85%] self-start">
               <div className="p-3 rounded-2xl bg-white text-gray-500 rounded-tl-none border border-gray-100 flex items-center gap-1 shadow-sm">
                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
               </div>
             </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your health query..." 
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm"
            />
            <button type="submit" disabled={!input.trim() || loading} className="bg-primary-600 text-white p-2 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50">
              <Send className="h-5 w-5 -ml-0.5 mt-0.5" />
            </button>
          </form>
          <div className="text-center mt-2 text-[10px] text-gray-400">
            AI-guidence only. Not a medical diagnosis.
          </div>
        </div>
      </div>
    </>
  );
}
