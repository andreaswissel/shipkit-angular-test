import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    hoverable: { control: 'boolean' },
    hasFooter: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-card [title]="title" [subtitle]="subtitle" [hoverable]="hoverable">
        <p>This is the card content. You can put any content here.</p>
      </ui-card>
    `,
  }),
  args: {
    title: 'Card Title',
    subtitle: 'Card subtitle text',
    hoverable: false,
  },
};

export const Simple: Story = {
  render: () => ({
    template: `
      <ui-card>
        <p>A simple card without header.</p>
      </ui-card>
    `,
  }),
};

export const Hoverable: Story = {
  render: () => ({
    template: `
      <ui-card title="Hover Me" subtitle="This card has hover effect" [hoverable]="true">
        <p>Move your mouse over this card to see the hover effect.</p>
      </ui-card>
    `,
  }),
};

export const WithFooter: Story = {
  render: () => ({
    template: `
      <ui-card title="Card with Footer" [hasFooter]="true">
        <p>This card has a footer section.</p>
        <div card-footer style="display: flex; gap: 0.5rem;">
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </ui-card>
    `,
  }),
};
