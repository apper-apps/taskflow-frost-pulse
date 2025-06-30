import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = 'Something went wrong', 
  onRetry,
  title = 'Oops!',
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
    >
      <div className="text-center max-w-md">
        {/* Error icon with gradient background */}
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6">
          <ApperIcon name="AlertTriangle" size={32} className="text-red-600" />
        </div>

        {/* Error title */}
        <h3 className="text-xl font-bold font-display text-surface-900 mb-2">
          {title}
        </h3>

        {/* Error message */}
        <p className="text-surface-600 mb-6 leading-relaxed">
          {message}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <Button
              onClick={onRetry}
              icon="RefreshCw"
              className="min-w-[120px]"
            >
              Try Again
            </Button>
          )}
          
          <Button
            variant="ghost"
            onClick={() => window.location.reload()}
            icon="RotateCcw"
            className="min-w-[120px]"
          >
            Reload Page
          </Button>
        </div>

        {/* Additional help text */}
        <p className="text-sm text-surface-500 mt-6">
          If the problem persists, try refreshing the page or check your internet connection.
        </p>
      </div>
    </motion.div>
  )
}

export default Error