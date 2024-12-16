import type { Meta, StoryObj } from '@storybook/react'
import { Template } from '.'

const meta: Meta<typeof Template> = {
  title: 'Components/Template',
  component: Template,
  tags: ['autodocs'],
  args: {
    template: 'Hello <%= name %>!',
    data: { name: 'World' },
  },
}

export default meta
type Story = StoryObj<typeof Template>

export const Basic: Story = {
  args: {
    template: 'Hello <%= name %>!',
    data: { name: 'World' },
  },
}

export const WithHtmlEscaping: Story = {
  args: {
    template: '<%- content %>',
    data: { content: '<script>alert("xss")</script>' },
    escapeHtml: true,
  },
}

export const WithSandbox: Story = {
  args: {
    template: '<%= calculate(value) %>',
    data: { value: 5 },
    sandbox: { calculate: (x: number) => x * 2 },
  },
}

export const WithCustomStyling: Story = {
  args: {
    template: 'Styled content',
    className: 'p-4 bg-gray-100 rounded-md',
  },
}
