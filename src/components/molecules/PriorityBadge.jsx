import React from 'react'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const PriorityBadge = ({ priority, showIcon = true, className = '' }) => {
  const priorityConfig = {
    low: {
      variant: 'default',
      icon: 'Minus',
      label: 'Low',
      dotClass: 'priority-low'
    },
    medium: {
      variant: 'info',
      icon: 'Equal',
      label: 'Medium',
      dotClass: 'priority-medium'
    },
    high: {
      variant: 'warning',
      icon: 'ChevronUp',
      label: 'High',
      dotClass: 'priority-high'
    },
    urgent: {
      variant: 'error',
      icon: 'AlertTriangle',
      label: 'Urgent',
      dotClass: 'priority-urgent'
    }
  }

  const config = priorityConfig[priority] || priorityConfig.medium

  return (
    <Badge variant={config.variant} className={`${className}`}>
      {showIcon && (
        <div className={`priority-dot ${config.dotClass} mr-1.5`} />
      )}
      {config.label}
    </Badge>
  )
}

export default PriorityBadge