import React, { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = forwardRef(({ 
  label,
  error,
  icon,
  iconPosition = 'left',
  className = '',
  containerClassName = '',
  ...props 
}, ref) => {
  const baseClasses = 'w-full px-4 py-3 border rounded-lg transition-all duration-200 bg-white focus:outline-none focus:ring-2 focus:ring-offset-0'
  const errorClasses = error 
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
    : 'border-surface-200 focus:border-primary-500 focus:ring-primary-500'
  
  const iconClasses = icon ? (iconPosition === 'left' ? 'pl-11' : 'pr-11') : ''

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-surface-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0' : 'right-0'} pl-3 flex items-center pointer-events-none`}>
            <ApperIcon 
              name={icon} 
              size={18} 
              className="text-surface-400" 
            />
          </div>
        )}
        <input
          ref={ref}
          className={`${baseClasses} ${errorClasses} ${iconClasses} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <ApperIcon name="AlertCircle" size={16} className="mr-1 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input