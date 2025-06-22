
import React from 'react';
import { User, Bot, Copy, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Message } from './ChatInterface';
import { useState } from 'react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={`flex space-x-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      {!message.isUser && (
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-3xl ${message.isUser ? 'order-first' : ''}`}>
        <div
          className={`rounded-lg p-4 ${
            message.isUser
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white ml-auto'
              : 'bg-white/10 backdrop-blur-sm text-white'
          }`}
        >
          <div className="whitespace-pre-wrap break-words">{message.text}</div>
          
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/20">
            <div className="flex items-center space-x-2 text-xs opacity-70">
              <span>{formatTime(message.timestamp)}</span>
              {message.model && (
                <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                  {message.model}
                </Badge>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="opacity-70 hover:opacity-100 h-6 w-6 p-0"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {message.isUser && (
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
