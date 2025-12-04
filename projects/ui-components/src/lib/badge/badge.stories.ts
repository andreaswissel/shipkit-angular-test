import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  render: (args) => ({
    props: args,
    template: `<ui-badge [variant]="variant" [size]="size">Badge</ui-badge>`,
  }),
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
  },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <ui-badge variant="default">Default</ui-badge>
        <ui-badge variant="success">Success</ui-badge>
        <ui-badge variant="warning">Warning</ui-badge>
        <ui-badge variant="danger">Danger</ui-badge>
        <ui-badge variant="info">Info</ui-badge>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ui-badge variant="info" size="sm">Small</ui-badge>
        <ui-badge variant="info" size="md">Medium</ui-badge>
        <ui-badge variant="info" size="lg">Large</ui-badge>
      </div>
    `,
  }),
};
