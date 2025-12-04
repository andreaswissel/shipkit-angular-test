import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'busy', 'away'],
    },
    src: { control: 'text' },
    initials: { control: 'text' },
    alt: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
    size: 'md',
  },
};

export const WithInitials: Story = {
  args: {
    initials: 'JD',
    size: 'md',
  },
};

export const Fallback: Story = {
  args: {
    size: 'md',
  },
};

export const WithStatus: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=2',
    status: 'online',
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <ui-avatar initials="XS" size="xs"></ui-avatar>
        <ui-avatar initials="SM" size="sm"></ui-avatar>
        <ui-avatar initials="MD" size="md"></ui-avatar>
        <ui-avatar initials="LG" size="lg"></ui-avatar>
        <ui-avatar initials="XL" size="xl"></ui-avatar>
      </div>
    `,
  }),
};

export const AllStatuses: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem;">
        <ui-avatar src="https://i.pravatar.cc/150?img=3" size="lg" status="online"></ui-avatar>
        <ui-avatar src="https://i.pravatar.cc/150?img=4" size="lg" status="away"></ui-avatar>
        <ui-avatar src="https://i.pravatar.cc/150?img=5" size="lg" status="busy"></ui-avatar>
        <ui-avatar src="https://i.pravatar.cc/150?img=6" size="lg" status="offline"></ui-avatar>
      </div>
    `,
  }),
};
