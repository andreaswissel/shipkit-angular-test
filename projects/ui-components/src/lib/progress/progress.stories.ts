import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressComponent } from './progress.component';

const meta: Meta<ProgressComponent> = {
  title: 'Components/Progress',
  component: ProgressComponent,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger'],
    },
    label: { control: 'text' },
    showValue: { control: 'boolean' },
    height: { control: 'number' },
    animated: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<ProgressComponent>;

export const Default: Story = {
  args: {
    value: 60,
    variant: 'default',
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    label: 'Upload Progress',
    showValue: true,
  },
};

export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
    label: 'Complete',
    showValue: true,
  },
};

export const Warning: Story = {
  args: {
    value: 80,
    variant: 'warning',
    label: 'Storage Usage',
    showValue: true,
  },
};

export const Danger: Story = {
  args: {
    value: 95,
    variant: 'danger',
    label: 'Critical Level',
    showValue: true,
  },
};

export const Animated: Story = {
  args: {
    value: 45,
    animated: true,
    label: 'Processing...',
    showValue: true,
  },
};

export const CustomHeight: Story = {
  args: {
    value: 70,
    height: 16,
    label: 'Larger Progress Bar',
    showValue: true,
  },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <ui-progress [value]="25" label="Default" [showValue]="true"></ui-progress>
        <ui-progress [value]="50" variant="success" label="Success" [showValue]="true"></ui-progress>
        <ui-progress [value]="75" variant="warning" label="Warning" [showValue]="true"></ui-progress>
        <ui-progress [value]="90" variant="danger" label="Danger" [showValue]="true"></ui-progress>
      </div>
    `,
  }),
};
