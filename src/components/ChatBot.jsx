import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Multi-Key Fallback Configuration ───
const API_KEYS = [
  'AIzaSyDeUxuz8b7IeY5lacCdvrnlBVOh6TU0nIQ',  // Primary key
  'AIzaSyApJvKK8hmEPaYAOwIcYbN51wkXExXDuhk',  // Alternate key (Gemini API Key)
];

const MODELS = ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-2.5-flash'];

const buildEndpoint = (key, model) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

const SYSTEM_CONTEXT = `You are Ranjith Kumar's AI portfolio assistant. Ranjith is a B.Tech Data Science student and aspiring web developer who builds real-world applications.

His key projects include:
- ODE Solver: A differential equation solver with step-by-step solutions
- Smart Water Planting System: An IoT-based automation project
- Resume Builder: A full-stack app for creating professional resumes
- This Portfolio: A modern MERN stack portfolio with animations

His skills include: React, Node.js, MongoDB, Express, Python, JavaScript, TailwindCSS, Git, and more.

Be friendly, concise, and helpful. Keep responses under 3 sentences unless the visitor asks for detail. If asked something unrelated, politely redirect to Ranjith's work.`;

// Tracks which key index worked last — avoids re-trying dead keys first
let lastWorkingKeyIndex = 0;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hey! 👋 I'm Ranjith's AI assistant. Ask me about his skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  /**
   * Attempts a single API call to a specific key + model combo.
   * Returns { ok: true, text } on success, or { ok: false, status } on failure.
   */
  const tryApiCall = async (apiKey, model, requestBody) => {
    const endpoint = buildEndpoint(apiKey, model);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
      });

      if (!response.ok) {
        return { ok: false, status: response.status };
      }

      const data = await response.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I couldn't generate a response. Please try again.";
      return { ok: true, text };
    } catch (err) {
      return { ok: false, status: 0, error: err.message };
    }
  };

  /**
   * Core send logic with multi-key + multi-model fallback.
   * Priority: last working key first → try other keys → try other models.
   * Each key/model combo gets up to 2 retries on 429 with backoff.
   */
  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg = { role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages
        .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
        .join('\n');

      const fullPrompt = `${SYSTEM_CONTEXT}\n\nConversation so far:\n${history}\nUser: ${trimmed}\nAssistant:`;
      const requestBody = JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
      });

      // Build ordered list of keys: start with the last working one
      const keyOrder = [
        lastWorkingKeyIndex,
        ...API_KEYS.map((_, i) => i).filter((i) => i !== lastWorkingKeyIndex),
      ];

      let succeeded = false;

      for (const keyIdx of keyOrder) {
        const apiKey = API_KEYS[keyIdx];

        for (const model of MODELS) {
          // Try up to 2 retries per key+model on rate limit
          for (let attempt = 0; attempt < 2; attempt++) {
            const result = await tryApiCall(apiKey, model, requestBody);

            if (result.ok) {
              lastWorkingKeyIndex = keyIdx;
              setMessages((prev) => [...prev, { role: 'bot', text: result.text }]);
              succeeded = true;
              break;
            }

            // 429 = rate limited → wait and retry same key+model
            if (result.status === 429 && attempt === 0) {
              await new Promise((r) => setTimeout(r, 2000));
              continue;
            }

            // 400 = bad model name → skip to next model
            if (result.status === 400) break;

            // 403/404 = key invalid or model unavailable → skip
            break;
          }

          if (succeeded) break;
        }

        if (succeeded) break;
      }

      if (!succeeded) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'error',
            text: "I'm having trouble connecting right now. Please try again in a moment.",
          },
        ]);
      }
    } catch (err) {
      console.error('ChatBot Error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'error', text: 'Something went wrong. Please try again later.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Animation variants
  const windowVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 260, damping: 22 },
    },
    exit: {
      opacity: 0,
      y: 24,
      scale: 0.92,
      transition: { duration: 0.2 },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      {/* ── Floating Toggle ── */}
      <motion.button
        id="chatbot-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed bottom-6 right-6 z-[9999] w-[60px] h-[60px] rounded-full border-none text-white text-2xl cursor-pointer flex items-center justify-center shadow-lg transition-colors duration-300 ${
          isOpen
            ? 'bg-gradient-to-br from-red-500 to-red-400 shadow-red-500/40'
            : 'bg-gradient-to-br from-primary to-purple-500 shadow-primary/40'
        }`}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        animate={
          !isOpen
            ? {
                boxShadow: [
                  '0 0 0 0 rgba(67,83,255,0.4)',
                  '0 0 0 14px rgba(67,83,255,0)',
                  '0 0 0 0 rgba(67,83,255,0)',
                ],
              }
            : {}
        }
        transition={!isOpen ? { duration: 2.5, repeat: Infinity } : {}}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        title={isOpen ? 'Close chat' : 'Chat with AI assistant'}
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot-window"
            variants={windowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-[6.5rem] right-6 w-[400px] max-h-[560px] z-[9998] flex flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            style={{
              background: 'rgba(11, 13, 23, 0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
            role="dialog"
            aria-label="Chat window"
          >
            {/* ─ Header ─ */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-lg shrink-0">
                🤖
              </div>
              <div>
                <h3 className="text-[0.95rem] font-semibold text-white leading-tight">
                  AI Assistant
                </h3>
                <span className="text-xs text-green-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
                  Online
                </span>
              </div>
            </div>

            {/* ─ Messages ─ */}
            <div
              id="chatbot-messages"
              className="flex-1 overflow-y-auto p-5 flex flex-col gap-3 min-h-[300px] max-h-[380px] scroll-smooth"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`max-w-[82%] px-4 py-3 text-sm leading-relaxed break-words ${
                    msg.role === 'user'
                      ? 'self-end bg-gradient-to-br from-primary to-purple-600 text-white rounded-2xl rounded-br-sm'
                      : msg.role === 'error'
                      ? 'self-start bg-red-500/10 border border-red-500/20 text-red-300 rounded-2xl rounded-bl-sm'
                      : 'self-start bg-white/[0.06] border border-white/[0.06] text-white rounded-2xl rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start flex gap-1.5 px-4 py-3 bg-white/[0.06] border border-white/[0.06] rounded-2xl rounded-bl-sm"
                >
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      className="w-[7px] h-[7px] bg-gray rounded-full"
                      animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: dot * 0.15,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ─ Input ─ */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-t border-white/[0.06] bg-white/[0.02]">
              <input
                id="chatbot-input"
                ref={inputRef}
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                autoComplete="off"
                className="flex-1 px-4 py-2.5 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white text-sm font-sans outline-none placeholder:text-gray/60 focus:border-primary/50 focus:bg-white/[0.08] transition-all duration-200 disabled:opacity-50"
              />
              <motion.button
                id="chatbot-send"
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="w-[42px] h-[42px] rounded-xl border-none bg-gradient-to-br from-primary to-purple-600 text-white text-lg cursor-pointer flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity duration-200"
                aria-label="Send message"
              >
                ➤
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile responsive overrides ── */}
      <style>{`
        @media (max-width: 480px) {
          #chatbot-toggle {
            bottom: 1.25rem !important;
            right: 1.25rem !important;
            width: 54px !important;
            height: 54px !important;
          }
          [role="dialog"][aria-label="Chat window"] {
            width: calc(100vw - 1.5rem) !important;
            right: 0.75rem !important;
            bottom: 5.5rem !important;
            max-height: calc(100vh - 8rem) !important;
          }
        }
        [id="chatbot-messages"]::-webkit-scrollbar { width: 4px; }
        [id="chatbot-messages"]::-webkit-scrollbar-track { background: transparent; }
        [id="chatbot-messages"]::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </>
  );
};

export default ChatBot;
