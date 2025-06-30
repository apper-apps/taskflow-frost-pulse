import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isToday, isPast, isThisWeek } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import PriorityBadge from '@/components/molecules/PriorityBadge'
import CategoryPill from '@/components/molecules/CategoryPill'
import Button from '@/components/atoms/Button'
import { toast } from 'react-toastify'

const TaskCard = ({ 
  task, 
  category, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  className = '' 
}) => {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleToggleComplete = async () => {
    if (task.completed) {
      onToggleComplete(task.Id)
      return
    }

    setIsCompleting(true)
    
    // Create confetti effect
    createConfetti()
    
    // Wait for animation
    setTimeout(() => {
      onToggleComplete(task.Id)
      setIsCompleting(false)
      toast.success('🎉 Task completed! Great job!', {
        position: "top-right",
        autoClose: 2000,
      })
    }, 400)
  }

  const createConfetti = () => {
    const colors = ['#5B4EE9', '#8B7FF2', '#F97316', '#10B981', '#3B82F6']
    const confettiCount = 15

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'confetti-particle'
      confetti.style.left = Math.random() * window.innerWidth + 'px'
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.animationDelay = Math.random() * 0.5 + 's'
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's'
      
      document.body.appendChild(confetti)
      
      setTimeout(() => {
        confetti.remove()
      }, 4000)
    }
  }

  const getDueDateInfo = () => {
    if (!task.dueDate) return null
    
    const dueDate = new Date(task.dueDate)
    const now = new Date()
    
    if (isPast(dueDate) && !isToday(dueDate)) {
      return {
        text: `Overdue (${format(dueDate, 'MMM d')})`,
        className: 'text-red-600 bg-red-50 border-red-200',
        icon: 'AlertTriangle'
      }
    }
    
    if (isToday(dueDate)) {
      return {
        text: 'Due today',
        className: 'text-amber-600 bg-amber-50 border-amber-200',
        icon: 'Clock'
      }
    }
    
    if (isThisWeek(dueDate)) {
      return {
        text: format(dueDate, 'EEE, MMM d'),
        className: 'text-blue-600 bg-blue-50 border-blue-200',
        icon: 'Calendar'
      }
    }
    
    return {
      text: format(dueDate, 'MMM d, yyyy'),
      className: 'text-surface-600 bg-surface-50 border-surface-200',
      icon: 'Calendar'
    }
  }

  const dueDateInfo = getDueDateInfo()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: task.completed && isCompleting ? 0.5 : 1, y: 0, scale: isCompleting ? 0.95 : 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`task-card p-4 ${task.completed ? 'opacity-60' : ''} ${className}`}
    >
      <div className="flex items-start space-x-3">
        <motion.button
          onClick={handleToggleComplete}
          className="custom-checkbox mt-0.5 flex-shrink-0"
          whileTap={{ scale: 0.9 }}
          checked={task.completed}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium text-surface-900 ${task.completed ? 'line-through' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="mt-1 text-sm text-surface-600 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2 ml-3 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                icon="Edit2"
                onClick={() => onEdit(task)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5"
              />
              <Button
                variant="ghost"
                size="sm"
                icon="Trash2"
                onClick={() => onDelete(task.Id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <PriorityBadge priority={task.priority} />
              {category && (
                <CategoryPill category={category} className="text-xs" />
              )}
            </div>

            {dueDateInfo && (
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${dueDateInfo.className}`}>
                <ApperIcon name={dueDateInfo.icon} size={12} />
                <span>{dueDateInfo.text}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {isCompleting && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.4 }}
            className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
          >
            <ApperIcon name="Check" size={24} className="text-white" />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TaskCard