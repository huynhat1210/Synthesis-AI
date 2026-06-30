/**
 * @file components/dashboard/ChatView.tsx
 * @description AI Career Advisor — full-featured chat interface powered by Gemini.
 *              Conversations are persisted to PostgreSQL and restored on mount.
 */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, RefreshCw, User, Bot, Lightbulb, ChevronDown, Lock, Rocket } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  sendChatMessageAction,
  loadChatHistoryAction,
  clearChatHistoryAction,
  type ChatMessage,
} from "@/actions/chat";
import type { MasterProfile } from "@/types";
import { type Language } from "@/lib/translations";

interface ChatViewProps {
  profile: MasterProfile;
  lang: Language;
}

const STARTER_PROMPTS_VI = [
  "Kỹ năng nào tôi đang thiếu nhất dựa trên hồ sơ hiện tại?",
  "Làm thế nào để tăng điểm tương thích của tôi với JD React Developer?",
  "Hãy gợi ý cách viết lại Bio của tôi để ấn tượng hơn.",
  "Tôi nên học thêm kỹ năng gì để chuyển sang vị trí Senior?",
  "Phân tích điểm mạnh và điểm yếu trong hồ sơ của tôi.",
];

const STARTER_PROMPTS_EN = [
  "What skills am I missing based on my current profile?",
  "How can I improve my alignment score for a React Developer JD?",
  "Suggest how to rewrite my Bio to be more impactful.",
  "What skills should I learn to move into a Senior role?",
  "Analyze the strengths and weaknesses in my profile.",
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5">
      <div className="w-7 h-7 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center shrink-0">
        <Bot className="w-4 h-4 text-secondary" />
      </div>
      <div className="bg-surface-container border border-outline-variant rounded-2xl rounded-bl-sm px-4 py-3 max-w-xs">
        <div className="flex gap-1.5 items-center h-4">
          <span className="w-2 h-2 rounded-full bg-secondary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-secondary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-secondary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
          isUser
            ? "bg-secondary text-on-secondary"
            : "bg-surface-container border border-outline-variant"
        }`}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-secondary" />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed rounded-2xl ${
          isUser
            ? "bg-secondary/15 text-primary border border-secondary/20 rounded-br-sm"
            : "bg-surface-container border border-outline-variant text-on-surface rounded-bl-sm"
        }`}
      >
        <div className="prose prose-sm max-w-none prose-p:my-1 prose-p:leading-relaxed prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-headings:mt-2 prose-headings:mb-1 prose-pre:bg-surface-container-high prose-pre:text-xs prose-code:text-xs prose-code:bg-surface-container-high prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-strong:text-primary prose-a:text-secondary">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {msg.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}

export function ChatView({ profile, lang }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [limitReached, setLimitReached] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isPro = profile.plan === "pro";
  const FREE_LIMIT = 5;
  // Count how many messages the user has sent in this session
  const userMsgCount = messages.filter((m) => m.role === "user").length;

  const starterPrompts = lang === "vi" ? STARTER_PROMPTS_VI : STARTER_PROMPTS_EN;

  // Load chat history from DB on mount
  useEffect(() => {
    (async () => {
      setHistoryLoading(true);
      const res = await loadChatHistoryAction();
      if (res.data) setMessages(res.data);
      setHistoryLoading(false);
    })();
  }, []);

  const scrollToBottom = (smooth = true) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
  };

  useEffect(() => {
    if (!historyLoading) scrollToBottom(false);
  }, [historyLoading]);

  useEffect(() => {
    if (messages.length > 0) scrollToBottom();
  }, [messages, loading]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 120);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    try {
      const res = await sendChatMessageAction(messages, text.trim());
      if (res.data) {
        setMessages([...newMessages, { role: "assistant", content: res.data }]);
      } else if (res.error === "LIMIT_REACHED") {
        // Remove the optimistic user message and show the wall
        setMessages(messages);
        setLimitReached(true);
      } else {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: `⚠️ ${res.error || (lang === "vi" ? "Đã xảy ra lỗi. Vui lòng thử lại." : "An error occurred. Please try again.")}`,
          },
        ]);
      }
    } catch (err: any) {
      setMessages([...newMessages, { role: "assistant", content: `⚠️ ${err.message || "Error."}` }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = async () => {
    setMessages([]);
    setInput("");
    setLimitReached(false);
    await clearChatHistoryAction();
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] max-h-[800px] bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant bg-surface shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary font-geist uppercase tracking-wider">
              AI Career Advisor
            </h3>
            <p className="text-[10px] text-on-surface-variant font-semibold">
              {lang === "vi"
                ? `Tư vấn cá nhân hóa cho ${profile.fullName?.split(" ")[0] || "bạn"} · Gemini 2.5 Flash`
                : `Personalized advisor for ${profile.fullName?.split(" ")[0] || "you"} · Gemini 2.5 Flash`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {lang === "vi" ? "Đang hoạt động" : "Online"}
          </span>
          {messages.length > 0 && !loading && (
            <button
              onClick={clearChat}
              className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error/5 rounded-lg transition-colors cursor-pointer"
              title={lang === "vi" ? "Xóa cuộc trò chuyện" : "Clear conversation"}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-4 scroll-smooth"
      >
        {historyLoading ? (
          <div className="h-full flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-secondary animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          /* Welcome / Empty state */
          <div className="h-full flex flex-col items-center justify-center text-center gap-5 py-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20 flex items-center justify-center"
            >
              <Bot className="w-8 h-8 text-secondary" />
            </motion.div>
            <div>
              <h4 className="text-base font-bold text-primary font-geist mb-1">
                {lang === "vi"
                  ? `Xin chào, ${profile.fullName?.split(" ")[0] || "bạn"}! 👋`
                  : `Hello, ${profile.fullName?.split(" ")[0] || "there"}! 👋`}
              </h4>
              <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed">
                {lang === "vi"
                  ? "Tôi là cố vấn nghề nghiệp AI của bạn, đã đọc qua toàn bộ hồ sơ của bạn. Hãy hỏi tôi bất cứ điều gì!"
                  : "I am your AI career advisor — I have already read your full profile. Ask me anything!"}
              </p>
            </div>

            {/* Starter prompt chips */}
            <div className="w-full max-w-sm space-y-2">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5 justify-center">
                <Lightbulb className="w-3 h-3" />
                {lang === "vi" ? "Gợi ý câu hỏi nhanh" : "Quick Starters"}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {starterPrompts.map((prompt, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => sendMessage(prompt)}
                    className="text-left text-xs px-3 py-2.5 bg-surface border border-outline-variant hover:border-secondary/40 hover:bg-secondary/5 rounded-xl text-on-surface-variant hover:text-primary transition-all cursor-pointer leading-snug"
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}
            {loading && <TypingIndicator />}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Scroll to bottom button */}
      <AnimatePresence>
        {showScrollBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollToBottom()}
            className="absolute bottom-24 right-8 w-8 h-8 bg-surface border border-outline-variant rounded-full flex items-center justify-center shadow-md hover:bg-surface-container-low cursor-pointer transition-colors z-10"
          >
            <ChevronDown className="w-4 h-4 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Input Area or Upgrade Wall */}
      {limitReached && !isPro ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-outline-variant bg-surface shrink-0 px-5 py-4"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-bold text-amber-800">
                {lang === "vi" ? `Đã dùng hết ${FREE_LIMIT} tin nhắn miễn phí` : `Free limit reached (${FREE_LIMIT} messages)`}
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                {lang === "vi"
                  ? "Nâng cấp lên Pro để tiếp tục trò chuyện không giới hạn với AI."
                  : "Upgrade to Pro for unlimited AI career conversations."}
              </p>
            </div>
            <a
              href="/dashboard?tab=settings"
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-on-secondary rounded-xl text-xs font-bold shadow-sm hover:bg-secondary/90 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Rocket className="w-3.5 h-3.5" />
              {lang === "vi" ? "Nâng cấp Pro" : "Upgrade to Pro"}
            </a>
          </div>
          <p className="text-[10px] text-on-surface-variant text-center mt-2 opacity-50">
            {lang === "vi" ? `Gói Starter: ${userMsgCount}/${FREE_LIMIT} tin nhắn đã dùng` : `Starter plan: ${userMsgCount}/${FREE_LIMIT} messages used`}
          </p>
        </motion.div>
      ) : (
        <div className="border-t border-outline-variant bg-surface px-4 py-3 shrink-0">
          <div className="flex items-end gap-2 max-w-4xl mx-auto">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder={
                lang === "vi"
                  ? "Nhập câu hỏi của bạn... (Enter để gửi, Shift+Enter để xuống dòng)"
                  : "Type your question... (Enter to send, Shift+Enter for new line)"
              }
              disabled={loading || historyLoading}
              className="flex-1 resize-none bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm text-primary placeholder:text-on-surface-variant outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all leading-relaxed max-h-32 overflow-y-auto disabled:opacity-60"
              style={{ minHeight: "46px" }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading || historyLoading}
              className="w-11 h-11 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shrink-0 hover:bg-secondary/90 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-secondary/20"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[10px] text-on-surface-variant text-center mt-2 opacity-60">
            {isPro
              ? (lang === "vi" ? "✨ Pro — Không giới hạn tin nhắn — Lịch sử được lưu tự động." : "✨ Pro — Unlimited messages — History auto-saved.")
              : (lang === "vi" ? `Gói Starter: ${userMsgCount}/${FREE_LIMIT} tin nhắn đã dùng · AI có thể mắc lỗi.` : `Starter: ${userMsgCount}/${FREE_LIMIT} messages used · AI can make mistakes.`)}
          </p>
        </div>
      )}
    </div>
  );
}
