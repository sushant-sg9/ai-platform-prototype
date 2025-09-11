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
          max-w-full sm:max-w-2xl lg:max-w-3xl p-3 sm:p-4 rounded-lg shadow-sm
          ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
          }
        `}
      >
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              isUser ? 'bg-blue-700' : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              {isUser ? (
                <User className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
              )}
            </div>
            
            <span className={`text-xs sm:text-sm font-medium truncate ${
              isUser ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
            }`}>
              {isUser ? 'You' : model || 'Assistant'}
            </span>
          </div>
          
          {timestamp && (
            <span className={`text-xs flex-shrink-0 ml-2 ${
              isUser ? 'text-blue-200' : 'text-gray-500 dark:text-gray-500'
            }`}>
              <span className="hidden sm:inline">{timestamp.toLocaleTimeString()}</span>
              <span className="sm:hidden">{timestamp.toLocaleTimeString().split(':').slice(0, 2).join(':')}</span>
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
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2 sm:mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className={`text-xs p-1.5 sm:p-2 ${
                copied 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Copy className="w-3 h-3 mr-0.5 sm:mr-1" />
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
            </Button>
            
            {onRegenerate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRegenerate}
                className="text-xs text-gray-500 dark:text-gray-400 p-1.5 sm:p-2"
              >
                <RotateCcw className="w-3 h-3 mr-0.5 sm:mr-1" />
                <span className="hidden sm:inline">Regenerate</span>
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="text-xs text-gray-500 dark:text-gray-400 p-1.5 sm:p-2"
            >
              <Download className="w-3 h-3 mr-0.5 sm:mr-1" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
