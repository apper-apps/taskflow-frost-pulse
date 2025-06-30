import React from 'react'
import { motion } from 'framer-motion'

const Loading = ({ className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Task cards skeleton */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-soft border border-surface-100 p-4"
        >
          <div className="flex items-start space-x-3">
            {/* Checkbox skeleton */}
            <div className="w-5 h-5 bg-surface-200 rounded border-2 border-surface-300 animate-pulse mt-0.5 flex-shrink-0" />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  {/* Title skeleton */}
                  <div className="h-5 bg-surface-200 rounded animate-pulse w-3/4" />
                  {/* Description skeleton */}
                  <div className="h-4 bg-surface-100 rounded animate-pulse w-1/2" />
                </div>
                
                {/* Action buttons skeleton */}
                <div className="flex space-x-2 ml-3">
                  <div className="w-8 h-8 bg-surface-100 rounded animate-pulse" />
                  <div className="w-8 h-8 bg-surface-100 rounded animate-pulse" />
                </div>
              </div>
              
              {/* Bottom section skeleton */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                  {/* Priority badge skeleton */}
                  <div className="h-6 w-16 bg-surface-200 rounded-full animate-pulse" />
                  {/* Category pill skeleton */}
                  <div className="h-6 w-20 bg-surface-100 rounded-full animate-pulse" />
                </div>
                
                {/* Due date skeleton */}
                <div className="h-6 w-24 bg-surface-100 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Loading