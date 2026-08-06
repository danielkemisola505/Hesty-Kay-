import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, RefreshCw, MessageSquare, ArrowRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LOGO_IMAGE } from '../data/portfolioData';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface ChatBotProps {
  onContactClick?: (subject?: string) => void;
}

const QUICK_QUESTIONS = [
  'What services do you offer?',
  'How much for a WordPress site?',
  'Can Daniel build custom Squarespace sites?',
  'How do I book a consultation call?',
];

export const ChatBot: React.FC<ChatBotProps> = ({ onContactClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text: "👋 Hi there! I'm **ChatGPT Assistant**, virtual AI assistant for **Hestykay Web Studio**.\n\nHow can I help you today? Ask me anything about Daniel's **WordPress**, **Squarespace**, or **custom web design** services!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      // Build conversation payload for backend
      const conversationHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get AI response.');
      }

      const botMsg: Message = {
        id: `m-${Date.now()}`,
        role: 'model',
        text: data.reply || "I'm having a slight connection issue. Please feel free to reach out to Daniel directly via the contact form!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: "I'm sorry, I encountered a temporary network glitch. You can send a direct message to Daniel using the **Contact** form below!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: "Chat cleared! How else can I assist you with Daniel's web design services?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Simple Markdown-like formatter for Bold and Bullet Points
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      // Process bold syntax **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-extrabold text-black dark:text-yellow-300">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <React.Fragment key={lineIdx}>
          {line.trim().startsWith('- ') || line.trim().startsWith('• ') ? (
            <div className="flex items-start gap-1.5 my-1 pl-1">
              <span className="text-yellow-500 dark:text-yellow-400 font-bold">•</span>
              <span>{formattedLine}</span>
            </div>
          ) : (
            <p className={lineIdx > 0 ? 'mt-1.5' : ''}>{formattedLine}</p>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9990]">
      <AnimatePresence>
        {/* Floating Chat Trigger Button */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative group"
          >
            {hasUnread && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500 border-2 border-black"></span>
              </span>
            )}

            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2.5 px-4.5 py-3.5 rounded-full bg-black dark:bg-zinc-900 text-yellow-400 border-2 border-yellow-400 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              aria-label="Open ChatGPT Assistant"
            >
              <div className="relative">
                <Bot className="w-6 h-6 text-yellow-400" />
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="font-bold text-sm text-yellow-400 hidden sm:inline">Ask ChatGPT</span>
            </button>
          </motion.div>
        )}

        {/* Chat Window Container */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-[92vw] sm:w-[380px] md:w-[420px] h-[540px] max-h-[80vh] bg-white dark:bg-zinc-950 rounded-3xl border-2 border-black dark:border-yellow-500/50 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-black text-white dark:bg-zinc-900 border-b border-zinc-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-yellow-400 p-0.5 border border-yellow-500 shrink-0 overflow-hidden">
                  <img src={LOGO_IMAGE} alt="ChatGPT" className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-yellow-400">ChatGPT Assistant</h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-yellow-400/20 text-yellow-300 border border-yellow-500/40">
                      GPT-4o
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-medium">Powered by ChatGPT • Studio Info</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-yellow-400 transition-colors"
                  title="Clear Chat"
                  aria-label="Clear Chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div
              ref={chatContainerRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-zinc-50 dark:bg-zinc-950 text-sm"
            >
              {messages.map((msg) => {
                const isBot = msg.role === 'model';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-lg bg-yellow-400 text-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-xs sm:text-sm leading-relaxed ${
                      isBot
                        ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-tl-xs'
                        : 'bg-yellow-400 text-black font-medium rounded-tr-xs'
                    }`}>
                      {renderFormattedText(msg.text)}
                      <div className={`text-[10px] mt-1.5 opacity-60 text-right ${isBot ? 'text-zinc-400' : 'text-black'}`}>
                        {msg.timestamp}
                      </div>
                    </div>

                    {!isBot && (
                      <div className="w-7 h-7 rounded-lg bg-black dark:bg-zinc-800 text-yellow-400 flex items-center justify-center shrink-0 mt-0.5 border border-yellow-400/30">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-yellow-400 text-black flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Quick Suggestion Chips (Shown when 2 or fewer messages) */}
              {messages.length <= 2 && !isLoading && (
                <div className="pt-2">
                  <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 mb-2">Suggested topics:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        className="text-xs text-left px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 text-black dark:text-yellow-300 border border-zinc-300 dark:border-yellow-500/30 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all cursor-pointer font-medium"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Direct Contact Banner */}
            <div className="px-4 py-2 bg-yellow-400/10 dark:bg-yellow-400/5 border-t border-zinc-200 dark:border-zinc-900 flex items-center justify-between">
              <span className="text-[11px] font-bold text-black dark:text-yellow-300">Ready to start a project?</span>
              <button
                onClick={() => {
                  if (onContactClick) onContactClick('Inquiry via ChatGPT Assistant');
                  setIsOpen(false);
                }}
                className="text-[11px] font-black text-black dark:text-yellow-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Send Direct Message <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about services, pricing, projects..."
                disabled={isLoading}
                className="flex-1 bg-zinc-100 dark:bg-zinc-950 text-black dark:text-white placeholder-zinc-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-400"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2.5 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 disabled:opacity-40 disabled:hover:bg-yellow-400 transition-all cursor-pointer shrink-0"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
