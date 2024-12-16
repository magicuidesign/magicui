import * as React from 'react'
import { SecureTemplate } from '@ecomm/secure-template'

export interface TemplateProps {
  /** The template string to render */
  template: string
  /** Data to be interpolated into the template */
  data?: Record<string, any>
  /** Optional sandbox for allowed functions and values */
  sandbox?: Record<string, any>
  /** Additional CSS classes */
  className?: string
  /** Whether to escape HTML by default */
  escapeHtml?: boolean
}

/**
 * A secure template component that prevents XSS attacks and provides sandboxed execution
 */
export const Template = React.forwardRef<HTMLDivElement, TemplateProps>(
  ({ template, data, sandbox, className, escapeHtml = true, ...props }, ref) => {
    const compiledTemplate = React.useMemo(
      () =>
        SecureTemplate.createReactTemplate(template, {
          sandbox,
          escape: escapeHtml ? undefined : null,
        }),
      [template, sandbox, escapeHtml]
    )

    return (
      <div ref={ref} className={className} {...props}>
        {compiledTemplate(data)}
      </div>
    )
  }
)

Template.displayName = 'Template'

export default Template
