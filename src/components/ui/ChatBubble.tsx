'use client';

import React, { useState } from 'react';
import { Copy, Download, RotateCcw, User, Bot } from 'lucide-react';
import Button from './Button';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  model?: string;
  onCopy?: () => void;
  onRegenerate?: () => void;
  onDownload?: () => void;
  className?: string;
  isStreaming?: boolean;
  showCursor?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  role,
  content,
  timestamp,
  model,
  onCopy,
  onRegenerate,
  onDownload,
  className = '',
  isStreaming = false,
  showCursor = true,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${role}-message-${timestamp?.getTime() || Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onDownload?.();
  };

  const isUser = role === 'user';

  return (
    <div
      className={`group flex ${isUser ? 'justify-end' : 'justify-start'} ${className}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div
        className={`
          max-w-3xl p-4 rounded-lg shadow-sm
          ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
          }
        `}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isUser ? 'bg-blue-700' : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              {isUser ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              )}
            </div>
            
            <span className={`text-sm font-medium ${
              isUser ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
            }`}>
              {isUser ? 'You' : model || 'Assistant'}
            </span>
          </div>
          
          {timestamp && (
            <span className={`text-xs ${
              isUser ? 'text-blue-200' : 'text-gray-500 dark:text-gray-500'
            }`}>
              {timestamp.toLocaleTimeString()}
            </span>
          )}
        </div>

        <div className="prose prose-sm max-w-none">
          <p className="whitespace-pre-wrap">
            {content}
            {isStreaming && showCursor && (
              <span className="animate-pulse text-blue-600 dark:text-blue-400 font-bold">|</span>
            )}
          </p>
        </div>

        {!isUser && (showActions || copied) && (
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className={`text-xs ${
                copied 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Copy className="w-3 h-3 mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            
            {onRegenerate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRegenerate}
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Regenerate
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="text-xs text-gray-500 dark:text-gray-400"
            >
              <Download className="w-3 h-3 mr-1" />
              Download
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
