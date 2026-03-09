import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Send, Loader2, Bot, User } from "lucide-react";
import MarkdownContent from "@/components/ai/MarkdownContent";

interface Message {
  role: "user" | "assistant";
  content: string;
  images?: string[];
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [threadId, setThreadId] = useState<string | undefined>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const chat = useMutation({
    mutationFn: (message: string) => api.chat(message, threadId),
    onSuccess: (data) => {
      setThreadId(data.thread_id);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response, images: data.images },
      ]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chat.isPending) return;

    const msg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    chat.mutate(msg);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Bot size={48} className="mb-4 text-[var(--color-muted)]" />
            <h2 className="font-condensed text-2xl font-bold uppercase tracking-wider">
              Manuell modus
            </h2>
            <p className="mt-2 max-w-md text-sm text-[var(--color-muted)]">
              Snakk med Vågal AI steg for steg. Du styrer kvar verktøy &mdash; søk i
              tekstar, vel bilder, legg til filter og tekst.
            </p>
          </div>
        )}

        <div className="mx-auto max-w-3xl">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--color-accent)] text-white">
                  <Bot size={16} />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[var(--color-accent)]/15 text-[var(--color-text)]"
                    : "border border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                <MarkdownContent content={msg.content} className="text-sm" />
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--color-tertiary)] text-[var(--color-muted)]">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}

          {chat.isPending && (
            <div className="mb-4 flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--color-accent)] text-white">
                <Bot size={16} />
              </div>
              <div className="flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-muted)]">
                <Loader2 size={14} className="animate-spin" />
                Tenker...
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Skriv ei melding..."
            className="flex-1 border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50 focus:border-[var(--color-accent)] focus:outline-none"
            disabled={chat.isPending}
          />
          <button
            type="submit"
            disabled={chat.isPending || !input.trim()}
            className="btn px-4 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
