import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = 'No items found',
  description = 'Get started by adding your first item',
  actionText = 'Add Item',
  onAction,
  icon = 'Inbox',
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
    >
      <div className="text-center max-w-md">
        {/* Empty state icon with gradient background */}
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6">
          <ApperIcon name={icon} size={40} className="text-primary-600" />
        </div>

        {/* Empty state title */}
        <h3 className="text-xl font-bold font-display text-surface-900 mb-2">
          {title}
        </h3>

        {/* Empty state description */}
        <p className="text-surface-600 mb-8 leading-relaxed">
          {description}
        </p>

        {/* Action button */}
        {onAction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={onAction}
              icon="Plus"
              size="lg"
              className="min-w-[140px] shadow-lg hover:shadow-xl"
            >
              {actionText}
            </Button>
          </motion.div>
        )}

        {/* Decorative elements */}
        <div className="flex justify-center space-x-2 mt-8 opacity-50">
          <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Motivational text */}
        <p className="text-xs text-surface-500 mt-6 font-medium">
          Stay organized, stay productive! ✨
        </p>
      </div>
    </motion.div>
  )
}

export default Empty