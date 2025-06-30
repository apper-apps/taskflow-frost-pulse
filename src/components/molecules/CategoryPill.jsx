import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const CategoryPill = ({ 
  category, 
  isActive = false, 
  onClick, 
  showCount = false,
  className = '' 
}) => {
  const handleClick = () => {
    if (onClick) onClick(category)
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`
        category-pill flex items-center space-x-2 transition-all duration-200
        ${isActive 
          ? 'bg-primary-100 text-primary-700 border-primary-300 shadow-sm' 
          : 'bg-white text-surface-600 border-surface-200 hover:bg-surface-50'
        }
        ${className}
      `}
    >
      <div 
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: category.color }}
      />
      <span className="font-medium">{category.name}</span>
      {showCount && (
        <span className={`
          text-xs px-2 py-0.5 rounded-full
          ${isActive 
            ? 'bg-primary-200 text-primary-800' 
            : 'bg-surface-100 text-surface-500'
          }
        `}>
          {category.taskCount || 0}
        </span>
      )}
    </motion.button>
  )
}

export default CategoryPill