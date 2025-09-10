import { NextResponse } from 'next/server';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  supportedFeatures: string[];
}

const models: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: 'Most capable GPT model, great for complex tasks',
    maxTokens: 8192,
    supportedFeatures: ['chat', 'completion', 'code']
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    description: 'Fast and efficient model for most tasks',
    maxTokens: 4096,
    supportedFeatures: ['chat', 'completion']
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    description: 'Balanced model with strong reasoning capabilities',
    maxTokens: 200000,
    supportedFeatures: ['chat', 'analysis', 'code']
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    description: 'Fastest Claude model for simple tasks',
    maxTokens: 200000,
    supportedFeatures: ['chat', 'completion']
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: 'Google\'s most capable AI model',
    maxTokens: 32768,
    supportedFeatures: ['chat', 'multimodal', 'code']
  }
];

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({
    success: true,
    data: models
  });
}
