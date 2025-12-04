import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ModalComponent } from './modal.component';
import { ButtonComponent } from '../button/button.component';
import { Component } from '@angular/core';

@Component({
  selector: 'modal-demo',
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  template: `
    <ui-button (clicked)="isOpen = true">Open Modal</ui-button>
    <ui-modal
      [isOpen]="isOpen"
      [title]="title"
      [size]="size"
      [showFooter]="showFooter"
      (closed)="isOpen = false"
    >
      <p>{{ content }}</p>
      <div modal-footer *ngIf="showFooter">
        <ui-button variant="ghost" (clicked)="isOpen = false">Cancel</ui-button>
        <ui-button variant="primary" (clicked)="isOpen = false">Confirm</ui-button>
      </div>
    </ui-modal>
  `,
})
class ModalDemoComponent {
  isOpen = false;
  title = 'Modal Title';
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  showFooter = true;
  content = 'This is the modal content. You can put any content here.';
}

const meta: Meta<ModalDemoComponent> = {
  title: 'Components/Modal',
  component: ModalDemoComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ModalComponent, ButtonComponent],
    }),
  ],
  argTypes: {
    title: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    showFooter: { control: 'boolean' },
    content: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<ModalDemoComponent>;

export const Default: Story = {
  args: {
    title: 'Modal Title',
    size: 'md',
    showFooter: true,
    content: 'This is the modal content. You can put any content here.',
  },
};

export const Small: Story = {
  args: {
    title: 'Small Modal',
    size: 'sm',
    showFooter: true,
    content: 'A smaller modal for simple confirmations.',
  },
};

export const Large: Story = {
  args: {
    title: 'Large Modal',
    size: 'lg',
    showFooter: true,
    content: 'A larger modal for more complex content.',
  },
};

export const NoFooter: Story = {
  args: {
    title: 'Modal without Footer',
    size: 'md',
    showFooter: false,
    content: 'This modal has no footer actions.',
  },
};
