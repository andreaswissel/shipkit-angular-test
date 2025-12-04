import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent } from './table.component';

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Pending' },
];

const columns = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
];

const meta: Meta<TableComponent> = {
  title: 'Components/Table',
  component: TableComponent,
  tags: ['autodocs'],
  argTypes: {
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    emptyMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<TableComponent>;

export const Default: Story = {
  args: {
    columns: columns,
    data: sampleData,
  },
};

export const Striped: Story = {
  args: {
    columns: columns,
    data: sampleData,
    striped: true,
  },
};

export const Hoverable: Story = {
  args: {
    columns: columns,
    data: sampleData,
    hoverable: true,
  },
};

export const StripedAndHoverable: Story = {
  args: {
    columns: columns,
    data: sampleData,
    striped: true,
    hoverable: true,
  },
};

export const Empty: Story = {
  args: {
    columns: columns,
    data: [],
    emptyMessage: 'No users found',
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    columns: columns,
    data: [],
    emptyMessage: 'Create your first user to get started!',
  },
};
