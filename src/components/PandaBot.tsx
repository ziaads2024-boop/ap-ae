'use client';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { X, Send, Loader2, User, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useRouter } from "next/router";
import { supabase } from '@/integrations/supabase/client';

const ReactMarkdown = dynamic(() => import('react-markdown')) as any;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface PandaBotProps {
  className?: string;
  iconUrl?: string;
}

export function PandaBot({ className, iconUrl = '/favicon.png' }: PandaBotProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [sessionId, setSessionId] = useState('');
  const [visitorId, setVisitorId] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSessionId(crypto.randomUUID());
      try {
        const stored = localStorage.getItem('visitor_id');
        if (stored) {
          setVisitorId(stored);
        } else {
          const newId = crypto.randomUUID();
          localStorage.setItem('visitor_id', newId);
          setVisitorId(newId);
        }
      } catch {
        setVisitorId(crypto.randomUUID());
      }
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Parse AI response for navigation links
  const parseResponseForLinks = (content: string) => {
    // Match patterns like [View Results](/search?q=...) or [Book Now](/clinic/...)
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links: { label: string; url: string }[] = [];
    let match;
    while ((match = linkPattern.exec(content)) !== null) {
      links.push({ label: match[1], url: match[2] });
    }
    return links;
  };

  const handleLinkClick = (url: string) => {
    if (url.startsWith('/')) {
      router.push(url);
      setIsOpen(false);
    } else if (url.startsWith('http')) {
      window.open(url, '_blank');
    }
  };

  const sendMessage = async (userInput: string) => {
    if (!userInput.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: userInput.trim() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const conversationHistory = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch(
        `${process.env.NEXT_SUPABASE_URL}/functions/v1/ai-assistant`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: conversationHistory,
            sessionId,
            visitorId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      let textBuffer = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                const lastIdx = newMessages.length - 1;
                if (newMessages[lastIdx]?.role === 'assistant') {
                  newMessages[lastIdx] = { role: 'assistant', content: assistantContent };
                }
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Panda Bot error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, I\'m having trouble connecting. Please try again in a moment.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Extract link-only lines vs text content
  const renderMessageContent = (content: string) => {
    // Split content into text lines and link lines
    const lines = content.split('\n');
    const textLines: string[] = [];
    const linkButtons: { label: string; url: string }[] = [];

    for (const line of lines) {
      const linkMatch = line.trim().match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        linkButtons.push({ label: linkMatch[1], url: linkMatch[2] });
      } else if (line.trim()) {
        textLines.push(line);
      }
    }

    return (
      <div className="space-y-2">
        {textLines.length > 0 && (
          <div className="prose prose-sm max-w-none [&_p]:mb-1 [&_p:last-child]:mb-0 text-sm">
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <button
                    onClick={() => href && handleLinkClick(href)}
                    className="text-ink underline underline-offset-2 font-medium"
                  >
                    {children}
                  </button>
                ),
                ul: ({ children }) => <ul className="list-disc pl-4 space-y-0.5 text-sm">{children}</ul>,
                li: ({ children }) => <li className="text-sm">{children}</li>,
                p: ({ children }) => <p className="text-sm leading-relaxed">{children}</p>,
              }}
            >
              {textLines.join('\n')}
            </ReactMarkdown>
          </div>
        )}
        {linkButtons.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {linkButtons.map((link, i) => (
              <button
                key={i}
                onClick={() => handleLinkClick(link.url)}
                className="inline-flex min-h-9 items-center gap-1 px-3 py-1.5 bg-white hover:border-ink text-ink text-xs font-semibold rounded-full transition-colors border border-black/15"
              >
                {link.label}
                <span aria-hidden="true" className="text-[10px]">→</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open the AppointPanda chat assistant"
        className={cn(
          // Plain ink circle; sits above the mobile sticky action bar and the iOS home indicator
          "fixed right-4 z-40 grid size-12 place-items-center rounded-full bg-ink text-white md:right-6 md:size-14",
          "bottom-[calc(5.5rem+env(safe-area-inset-bottom))] lg:bottom-6",
          "shadow-[0_6px_20px_rgba(18,18,18,0.22)] ring-1 ring-white/20 transition-colors hover:bg-[#2a2a2a]",
          "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink",
          className
        )}
      >
        <img
          src={iconUrl}
          alt=""
          aria-hidden="true"
          className="h-6 w-6 object-contain md:h-7 md:w-7"
          onError={(e) => {
            e.currentTarget.src = '/logo.png';
          }}
        />
      </button>
    );
  }

  return (
    <div
      className={cn(
        "fixed z-50 shadow-[0_20px_50px_rgba(0,0,0,0.18)] overflow-hidden",
        "bg-card border border-border",
        // Mobile: Full width bottom sheet style
        "bottom-0 right-0 left-0 pb-[env(safe-area-inset-bottom)] md:pb-0 md:bottom-6 md:right-6 md:left-auto",
        "rounded-t-2xl md:rounded-2xl",
        isMinimized ? "h-14 md:w-72" : "h-[85vh] md:h-[500px] md:w-[360px]",
        "transition-all duration-300 ease-in-out flex flex-col",
        className
      )}
    >
      {/* Header */}
      <div className="bg-ink text-white p-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center overflow-hidden">
            <img
              src={iconUrl}
              alt="Assistant"
              className="h-6 w-6 object-contain"
              onError={(e) => {
                e.currentTarget.src = '/logo.png';
              }}
            />
          </div>
          <div>
            <p className="font-semibold text-sm">Panda Assistant</p>
            {!isMinimized && (
              <p className="text-xs opacity-80">Ask me anything</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-white hover:bg-white/15 hover:text-white"
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? 'Expand chat' : 'Minimise chat'}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-white hover:bg-white/15 hover:text-white"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <ScrollArea className="flex-1 p-3" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-paper flex items-center justify-center mx-auto mb-3 overflow-hidden">
                  <img
                    src={iconUrl}
                    alt=""
                    className="h-8 w-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/logo.png';
                    }}
                  />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">Hi, I can help you find a dentist in Dubai</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Tell me what you need and where you are, and I will point you to clinics and guides. I am not a dentist and cannot give medical advice.
                </p>
                <div className="space-y-1.5">
                  {[
                    "Find a dentist in Dubai for a cleaning",
                    "Which clinics in Dubai Marina take my insurance?",
                    "I need an emergency dentist in Dubai"
                  ].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="block min-h-11 w-full text-left px-3 py-2.5 bg-paper hover:bg-zinc-100 rounded-lg text-sm font-medium text-ink transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-2",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-paper flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src={iconUrl}
                        alt=""
                        className="h-4 w-4 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = '/logo.png';
                        }}
                      />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-xl px-3 py-2 text-sm",
                      message.role === 'user'
                        ? "bg-ink text-white"
                        : "bg-muted"
                    )}
                  >
                    {message.content ? (
                      message.role === 'assistant'
                        ? renderMessageContent(message.content)
                        : message.content
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-ink flex items-center justify-center flex-shrink-0">
                      <User className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-paper flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={iconUrl}
                      alt=""
                      className="h-4 w-4 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = '/logo.png';
                      }}
                    />
                  </div>
                  <div className="bg-muted rounded-xl px-3 py-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-border shrink-0">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 text-base md:text-sm h-11"
                aria-label="Message the assistant"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="h-11 w-11 bg-ink text-white hover:bg-[#2a2a2a]"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
