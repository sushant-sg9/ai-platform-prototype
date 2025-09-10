import type { Meta, StoryObj } from '@storybook/react';
import Slider from '../components/ui/Slider';
import { fn } from '@storybook/test';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Temperature',
    value: 0.7,
    min: 0,
    max: 2,
    step: 0.1,
    description: 'Controls randomness in responses',
  },
};

export const MaxTokens: Story = {
  args: {
    label: 'Max Tokens',
    value: 1000,
    min: 1,
    max: 4000,
    step: 100,
    description: 'Maximum number of tokens in response',
  },
};

export const TopP: Story = {
  args: {
    label: 'Top P',
    value: 1.0,
    min: 0,
    max: 1,
    step: 0.1,
    description: 'Nucleus sampling parameter',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Slider',
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.1,
    disabled: true,
  },
};
