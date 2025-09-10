import type { Meta, StoryObj } from '@storybook/nextjs';
import ChatBubble from '../components/ui/ChatBubble';
import { fn } from '@storybook/test';

const meta: Meta<typeof ChatBubble> = {
  title: 'UI/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onCopy: fn(),
    onRegenerate: fn(),
    onDownload: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const UserMessage: Story = {
  args: {
    role: 'user',
    content: 'Hello! Can you help me with a programming question?',
    timestamp: new Date(),
  },
};

export const AssistantMessage: Story = {
  args: {
    role: 'assistant',
    content: 'Of course! I would be happy to help you with your programming question. What would you like to know?',
    timestamp: new Date(),
    model: 'GPT-4',
  },
};

export const LongAssistantMessage: Story = {
  args: {
    role: 'assistant',
    content: 'Here is a comprehensive explanation of React hooks. React Hooks are functions that let you hook into React state and lifecycle features from function components.',
    timestamp: new Date(),
    model: 'Claude 3 Sonnet',
  },
};

export const CodeAssistantMessage: Story = {
  args: {
    role: 'assistant',
    content: 'Here is a simple React component example that demonstrates the useState hook for managing local state.',
    timestamp: new Date(),
    model: 'GPT-4',
  },
};
