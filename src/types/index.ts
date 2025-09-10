import React from 'react';

// Define API types locally to avoid build issues during deployment
export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  supportedFeatures: string[];
}

// Define PromptTemplate interface locally to avoid build issues
export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  prompt: string;
  parameters: {
    temperature: number;
    maxTokens: number;
    topP: number;
  };
  tags: string[];
}

// Chat and message types
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  model?: string;
  parameters?: ModelParameters;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  model: string;
  parameters: ModelParameters;
}

// Model parameters
export interface ModelParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

// UI State types
export interface ChatState {
  conversations: Conversation[];
  currentConversation: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  selectedModel: string;
  parameters: ModelParameters;
  templates: PromptTemplate[];
  models: AIModel[];
  chat: ChatState;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
}

// Component props types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  model?: string;
  onCopy?: () => void;
  onRegenerate?: () => void;
  onDownload?: () => void;
  className?: string;
}

export interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}
