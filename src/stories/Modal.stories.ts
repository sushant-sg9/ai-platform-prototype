import type { Meta, StoryObj } from '@storybook/nextjs';
import Modal from '../components/ui/Modal';
import { fn } from '@storybook/test';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClose: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Example Modal',
    children: 'This is the modal content. You can put any React elements here.',
  },
};

export const Large: Story = {
  args: {
    isOpen: true,
    title: 'Large Modal',
    size: 'lg',
    children: 'This is a large modal with more content.',
  },
};

export const NoCloseButton: Story = {
  args: {
    isOpen: true,
    title: 'Modal Without Close Button',
    showCloseButton: false,
    children: 'This modal does not have a close button.',
  },
};

export const Small: Story = {
  args: {
    isOpen: true,
    title: 'Small Modal',
    size: 'sm',
    children: 'This is a small modal with minimal content.',
  },
};
