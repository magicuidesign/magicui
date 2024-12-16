import { render, screen } from '@testing-library/react'
import { Template } from '.'

describe('Template', () => {
  it('renders basic interpolation', () => {
    render(<Template template="Hello <%= name %>!" data={{ name: 'World' }} />)
    expect(screen.getByText('Hello World!')).toBeInTheDocument()
  })

  it('escapes HTML by default', () => {
    const xssAttempt = '<script>alert("xss")</script>'
    render(<Template template="<%- content %>" data={{ content: xssAttempt }} />)
    expect(screen.getByText('&lt;script&gt;alert("xss")&lt;/script&gt;')).toBeInTheDocument()
  })

  it('supports sandbox environment', () => {
    render(
      <Template
        template="<%= calculate(value) %>"
        data={{ value: 5 }}
        sandbox={{ calculate: (x: number) => x * 2 }}
      />
    )
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('prevents access to dangerous globals', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    render(<Template template="<%= process.env %>" data={{}} />)
    expect(screen.getByText('')).toBeInTheDocument() // Should render empty when access is blocked
    expect(consoleError).toHaveBeenCalled()
    consoleError.mockRestore()
  })

  it('applies custom className', () => {
    render(<Template template="Test" className="custom-class" />)
    expect(screen.getByText('Test')).toHaveClass('custom-class')
  })
})
