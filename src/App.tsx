/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Info, 
  Paperclip, 
  Mic, 
  Send, 
  Circle,
  Cpu
} from 'lucide-react';
import { Message } from './types';

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'ai',
    content: 'System initialized. I am Conduit. How can I assist with your architectural synthesis today?',
    timestamp: '09:41 AM'
  },
  {
    id: '2',
    role: 'user',
    content: 'I need a structural breakdown of the neo-tokyo grid infrastructure. Focus on energy distribution nodes.',
    timestamp: '09:42 AM'
  },
  {
    id: '3',
    role: 'ai',
    content: 'Analyzing Neo-Tokyo power grid architecture... Here are the primary distribution hubs identified:',
    timestamp: '09:42 AM',
    cards: [
      { title: 'NODE 01: SHIBUYA CORE', status: 'Operational (98.4%)' },
      { title: 'NODE 02: MINATO SPHERES', status: 'Heavy Load (82.1%)' }
    ]
  }
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: 'Synthesis complete. I have mapped the requested coordinates. Would you like to proceed with the visualization?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-background text-on-background font-body selection:bg-primary-container/30">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-primary-container/10 shadow-[0_40px_60px_-15px_rgba(157,5,255,0.08)]">
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border border-primary/20 bg-surface-container flex items-center justify-center overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLwAxiEtCwNAUZhoUtJN89eg3f5ksmV7qGdbdL-Qy9oHdOP3FjYTIpAtItr-h367imrXDrbEMGVanjK1QlkpEi1rB4ZPMjp6yqL4mp76YZ8lcXLv-kKayELjE5yCBWuxCJHrkeBlO5ch0-DVhGavuejv4aupW-xvr80reKc3DGDRYH_eexn_r-5DezVLAYwRFIq_-NUUNmHb49Zfx97DSAq4R8vDsKfqKG6llhMGXuu1ovlOrCrH9x-FCGYt6kQs3iLCCCWHLKsDU" 
                  alt="Conduit AI Avatar"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary-container rounded-full pulse-glow"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-lg tracking-tight text-primary">Conduit AI</span>
              <span className="font-label text-[10px] uppercase tracking-widest text-primary/60">Quantum Neural Sync</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-primary/60 hover:bg-primary/5 transition-colors rounded-full active:scale-95">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 text-primary/60 hover:bg-primary/5 transition-colors rounded-full active:scale-95">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Chat Canvas */}
      <main className="flex-1 mt-16 mb-24 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
        {/* Decorative Background Dust/Stars */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-primary-container rounded-full"></div>
          <div className="absolute top-3/4 left-1/3 w-0.5 h-0.5 bg-secondary rounded-full"></div>
          <div className="absolute top-1/10 left-4/5 w-1 h-1 bg-white rounded-full"></div>
        </div>

        {/* Chat Glass Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl h-full glass-panel rounded-[2rem] flex flex-col shadow-2xl relative overflow-hidden"
        >
          {/* Messages Scroll Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar scroll-smooth"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="flex gap-1.5">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-1.5 h-1.5 bg-primary-container rounded-full" 
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    className="w-1.5 h-1.5 bg-primary-container/60 rounded-full" 
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    className="w-1.5 h-1.5 bg-primary-container/30 rounded-full" 
                  />
                </div>
                <span className="text-[10px] font-headline uppercase tracking-widest text-primary-container/40">Conduit is processing...</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      {/* BottomNavBar (Input Shell) */}
      <footer className="fixed bottom-0 w-full z-50 bg-background/40 backdrop-blur-2xl border-t border-primary-container/10 shadow-[0_-10px_40px_rgba(0,240,255,0.05)] rounded-t-3xl">
        <div className="flex items-center px-6 py-4 w-full max-w-4xl mx-auto gap-4">
          <button className="p-2 text-primary/40 hover:text-primary-container transition-all active:scale-95">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative group">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full bg-surface-container-highest/40 border-none rounded-full py-3.5 px-6 text-on-background placeholder:text-primary/30 focus:ring-1 focus:ring-primary-container/30 transition-all font-body text-sm tracking-wide outline-none"
              placeholder="Synthesize a request..."
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button className="p-1.5 text-primary-container hover:bg-primary-container/10 rounded-full transition-colors active:scale-90">
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-primary-container text-background w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 fill-current" />
          </button>
        </div>
      </footer>

      {/* Side Decoration ( HUD Elements ) */}
      <aside className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-8 opacity-20 pointer-events-none">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-headline text-primary-container tracking-tighter">LATENCY</span>
          <div className="w-16 h-1 bg-surface-container-highest overflow-hidden rounded-full">
            <motion.div 
              animate={{ width: ['20%', '40%', '30%'] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="h-full bg-primary-container" 
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-headline text-secondary tracking-tighter">THROUGHPUT</span>
          <div className="w-16 h-1 bg-surface-container-highest overflow-hidden rounded-full">
            <motion.div 
              animate={{ width: ['60%', '80%', '70%'] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="h-full bg-secondary" 
            />
          </div>
        </div>
      </aside>

      <aside className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-end gap-4 opacity-20 text-right pointer-events-none">
        <span className="text-[8px] font-headline text-primary-container uppercase tracking-widest rotate-90 origin-right translate-y-12 whitespace-nowrap">
          Session: v0.42.9_BETA
        </span>
      </aside>
    </div>
  );
}

interface MessageBubbleProps {
  message: Message;
  key?: string | number;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isAi = message.role === 'ai';

  return (
    <motion.div 
      initial={{ opacity: 0, x: isAi ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`flex flex-col ${isAi ? 'items-start max-w-[85%]' : 'items-end max-w-[85%] ml-auto'}`}
    >
      <div className={`${isAi ? 'ai-bubble' : 'user-bubble'} p-5 rounded-2xl ${isAi ? 'rounded-tl-sm' : 'rounded-tr-sm'} shadow-lg`}>
        <p className="text-on-background leading-relaxed whitespace-pre-wrap">{message.content}</p>
        
        {message.cards && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {message.cards.map((card, idx) => (
              <div key={idx} className="bg-surface-container-high/40 p-3 rounded-xl border border-primary-container/5">
                <span className="text-primary-container text-xs font-headline font-bold block uppercase tracking-tight">
                  {card.title}
                </span>
                <p className="text-[10px] text-on-background/60 mt-1 font-label">
                  Status: {card.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <span className={`mt-2 text-[10px] font-headline tracking-widest text-on-background/30 ${isAi ? 'ml-1' : 'mr-1'}`}>
        {isAi ? 'CONDUIT' : 'USER'} • {message.timestamp}
      </span>
    </motion.div>
  );
}
