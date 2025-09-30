'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Loader2, Send, X, User, CornerDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { integrateAIChatbot } from '@/ai/flows/ai-chatbot-integration';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
        setIsLoading(true);
        setTimeout(() => {
            setMessages([
                { id: '1', text: "Hello! I'm Anil's AI assistant. Feel free to ask me anything about his skills, projects, or experience.", sender: 'ai' }
            ]);
            setIsLoading(false);
        }, 1000);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await integrateAIChatbot({ query: input });
      const aiMessage: Message = { id: (Date.now() + 1).toString(), text: response.response, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { id: (Date.now() + 1).toString(), text: 'Sorry, I am having trouble connecting. Please try again later.', sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Chatbot error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 2 }}
      >
        <Button
          size="icon"
          className="w-16 h-16 rounded-full neon-glow-secondary shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="w-8 h-8" />
        </Button>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-lg glass-card p-0 flex flex-col h-[70vh] max-h-[700px]">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
              <Bot className="text-primary" />
              AI Assistant
            </DialogTitle>
            <DialogDescription>Ask me about Anil's skills, projects, and more.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={cn("flex items-end gap-2", message.sender === 'user' ? 'justify-end' : 'justify-start')}>
                        {message.sender === 'ai' && (
                            <Avatar className="w-8 h-8 border-2 border-primary">
                                <AvatarFallback className="bg-primary/20"><Bot className="w-4 h-4 text-primary" /></AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn(
                            "max-w-[75%] rounded-lg px-4 py-2",
                            message.sender === 'user'
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        )}>
                            <p className="text-sm">{message.text}</p>
                        </div>
                        {message.sender === 'user' && (
                            <Avatar className="w-8 h-8">
                                <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
                {isLoading && messages.length > 0 && (
                    <div className="flex items-end gap-2 justify-start">
                        <Avatar className="w-8 h-8 border-2 border-primary">
                            <AvatarFallback className="bg-primary/20"><Bot className="w-4 h-4 text-primary" /></AvatarFallback>
                        </Avatar>
                        <div className="max-w-[75%] rounded-lg px-4 py-2 bg-muted">
                           <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        </div>
                    </div>
                )}
              </div>
          </ScrollArea>
          <DialogFooter className="p-6 pt-2">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                <Input 
                    type="text" 
                    placeholder="Type your message..." 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 bg-background/50 focus-visible:ring-primary"
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="shrink-0">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center w-full pt-1">Press <CornerDownLeft className="inline h-3 w-3" /> to send.</p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
