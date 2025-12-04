import type { Meta, StoryObj } from '@storybook/angular';
import { StatCardComponent } from './stat-card.component';

const meta: Meta<StatCardComponent> = {
  title: 'Components/StatCard',
  component: StatCardComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    icon: { control: 'text' },
    trend: { control: 'number' },
    trendLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<StatCardComponent>;

export const Default: Story = {
  args: {
    label: 'Total Revenue',
    value: '$45,231',
    icon: '💰',
    trend: 12.5,
    trendLabel: 'from last month',
  },
};

export const PositiveTrend: Story = {
  args: {
    label: 'New Users',
    value: '2,543',
    icon: '👥',
    trend: 23.1,
    trendLabel: 'from last week',
  },
};

export const NegativeTrend: Story = {
  args: {
    label: 'Bounce Rate',
    value: '42.3%',
    icon: '📉',
    trend: -8.2,
    trendLabel: 'from last month',
  },
};

export const NoTrend: Story = {
  args: {
    label: 'Active Sessions',
    value: '1,234',
    icon: '📊',
  },
};

export const DashboardExample: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
        <ui-stat-card
          label="Total Revenue"
          value="$45,231"
          icon="💰"
          [trend]="12.5"
          trendLabel="from last month"
        ></ui-stat-card>
        <ui-stat-card
          label="New Customers"
          value="1,234"
          icon="👥"
          [trend]="8.2"
          trendLabel="from last week"
        ></ui-stat-card>
        <ui-stat-card
          label="Active Orders"
          value="342"
          icon="📦"
          [trend]="-2.1"
          trendLabel="from yesterday"
        ></ui-stat-card>
        <ui-stat-card
          label="Conversion Rate"
          value="3.24%"
          icon="📈"
          [trend]="0.8"
          trendLabel="from last month"
        ></ui-stat-card>
      </div>
    `,
  }),
};
