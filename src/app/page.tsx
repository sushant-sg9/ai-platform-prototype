'use client';

import React, { useState } from 'react';
import { Moon, Sun, Bot, Settings, MessageSquare } from 'lucide-react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import ModelSelector from '@/components/ModelSelector';
import PromptEditor from '@/components/PromptEditor';
import Button from '@/components/ui/Button';

function AIInterface() {
  const { theme, toggleTheme } = useTheme();
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Array<{id: string, role: 'user' | 'assistant', content: string, model?: string, timestamp: Date}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [parameters, setParameters] = useState({
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1.0
  });
  const [showParameters, setShowParameters] = useState(false);
  const [conversationCount, setConversationCount] = useState(1);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  // Start new conversation when model changes
  const handleModelChange = (newModel: string) => {
    if (newModel !== selectedModel && messages.length > 0) {
      // Clear current conversation and start fresh
      setMessages([]);
      setPrompt('');
      setConversationCount(prev => prev + 1);
    }
    setSelectedModel(newModel);
  };

  // Start completely new conversation
  const startNewConversation = () => {
    setMessages([]);
    setPrompt('');
    setConversationCount(prev => prev + 1);
  };

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: promptText,
      model: selectedModel,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setPrompt('');
    setIsLoading(true);

    // Simulate API call with more realistic responses
    setTimeout(() => {
      const responses = {
        'gpt-4': `I'm GPT-4, and I'll help you with that! ${promptText.includes('code') ? 'Here\'s a code solution:' : 'Let me provide a detailed response:'} This is a simulated response showcasing the capabilities of GPT-4.`,
        'gpt-3.5-turbo': `As GPT-3.5 Turbo, I can quickly assist you! ${promptText.includes('question') ? 'Great question!' : 'Here\'s my response:'} This demonstrates the fast and efficient nature of GPT-3.5 Turbo.`,
        'claude-3-sonnet': `Hello! I'm Claude 3 Sonnet. ${promptText.includes('help') ? 'I\'d be delighted to help!' : 'Thank you for your message.'} This response simulates Claude\'s thoughtful and balanced approach.`,
        'claude-3-haiku': `Hi! Claude 3 Haiku here - quick and concise! ${promptText.length > 50 ? 'I see you have a detailed question.' : 'Short and sweet!'} Fast response as expected from Haiku.`,
        'gemini-pro': `Greetings! I'm Gemini Pro from Google. ${promptText.includes('analyze') ? 'Let me analyze this for you:' : 'Here\'s my comprehensive response:'} This showcases Gemini\'s analytical capabilities.`
      };

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: responses[selectedModel as keyof typeof responses] || 'This is a simulated response from the AI model.',
        model: selectedModel,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, Math.random() * 1000 + 1000); // Random delay between 1-2 seconds
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      {/* Enhanced Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-700/60 px-3 sm:px-4 py-3 sm:py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent truncate">
                <span className="hidden sm:inline">AI Platform Prototype</span>
                <span className="sm:hidden">AI Platform</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                <span className="hidden sm:inline">Conversation #{conversationCount} • {selectedModel}</span>
                <span className="sm:hidden">#{conversationCount} • {selectedModel.split('-')[0]}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* New Chat Button - Icon only for all screens */}
            <Button
              variant="outline"
              size="sm"
              onClick={startNewConversation}
              className="p-2 bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 border-gray-300/50 dark:border-gray-600/50"
              aria-label="New Chat"
            >
              <MessageSquare className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowParameters(!showParameters)}
              className="flex items-center gap-0 sm:gap-2 p-2"
              aria-label="Parameters"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline ml-0 sm:ml-0">Parameters</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Model Selector */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Model Selection
              </h2>
              <ModelSelector
                selectedModel={selectedModel}
                onModelChange={handleModelChange}
                onDropdownToggle={setIsModelDropdownOpen}
              />
            </div>

            {/* Enhanced Parameters Panel */}
            {showParameters && (
              <div className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 ${isModelDropdownOpen ? 'mt-56 sm:mt-60 lg:mt-0' : ''}`}>
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Parameters
                </h2>
                <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Temperature: {parameters.temperature}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={parameters.temperature}
                      onChange={(e) => setParameters(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Max Tokens: {parameters.maxTokens}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="4000"
                      step="100"
                      value={parameters.maxTokens}
                      onChange={(e) => setParameters(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Top P: {parameters.topP}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={parameters.topP}
                      onChange={(e) => setParameters(prev => ({ ...prev, topP: parseFloat(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Main Content */}
          <div className={`lg:col-span-3 space-y-3 sm:space-y-4 lg:space-y-6 transition-all duration-300 ${isModelDropdownOpen ? 'mt-56 sm:mt-60 lg:mt-0' : ''}`}>
            {/* Enhanced Chat Area */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 h-[400px] sm:h-[450px] lg:h-[500px] flex flex-col overflow-hidden">
              <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-900/50">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md">
                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate">Conversation #{conversationCount}</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-normal truncate">
                      {messages.length > 0 ? `${messages.length} messages` : 'Start your conversation'}
                    </div>
                  </div>
                </h2>
              </div>
              
              <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto space-y-3 sm:space-y-4 bg-gradient-to-b from-transparent to-gray-50/30 dark:to-gray-900/30">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 mt-12 sm:mt-16 lg:mt-24 animate-fade-in px-4">
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-xl">
                      <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ready to Chat!
                    </h3>
                    <p className="text-sm">
                      Send a message to <span className="hidden sm:inline">{selectedModel}</span><span className="sm:hidden">{selectedModel.split('-')[0]}</span> using the prompt editor below
                    </p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`max-w-full sm:max-w-2xl lg:max-w-3xl p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200/50 dark:border-gray-700/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            message.role === 'user' 
                              ? 'bg-blue-700' 
                              : 'bg-gradient-to-br from-purple-500 to-pink-500'
                          }`}>
                            {message.role === 'user' ? (
                              <span className="text-xs font-bold text-white">U</span>
                            ) : (
                              <Bot className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className={`text-xs font-medium ${
                            message.role === 'user' 
                              ? 'text-blue-100' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {message.role === 'user' ? 'You' : message.model || 'Assistant'}
                          </span>
                          <span className={`text-xs ml-auto ${
                            message.role === 'user' 
                              ? 'text-blue-200' 
                              : 'text-gray-500 dark:text-gray-500'
                          }`}>
                            {message.timestamp?.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))
                )}
                
                {isLoading && (
                  <div className="flex justify-start animate-slide-in">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          <span className="text-xs ml-2">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Prompt Editor */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <PromptEditor
                value={prompt}
                onChange={setPrompt}
                onSubmit={handleSendPrompt}
                isLoading={isLoading}
                placeholder={`Send a message to ${selectedModel}... (Ctrl/Cmd + Enter to send)`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <AIInterface />
    </ThemeProvider>
  );
}
