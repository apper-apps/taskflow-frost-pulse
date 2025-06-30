import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const TaskQuickAdd = ({ onAddTask, categories = [] }) => {
  const [title, setTitle] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const newTask = {
      title: title.trim(),
      categoryId: selectedCategory || (categories[0]?.Id.toString() || '1'),
      priority,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString()
    }

    onAddTask(newTask)
    setTitle('')
    setDueDate('')
    setIsExpanded(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isExpanded && title.trim()) {
        handleSubmit(e)
      } else if (isExpanded) {
        handleSubmit(e)
      }
    }
    if (e.key === 'Escape') {
      setIsExpanded(false)
      setTitle('')
    }
  }

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-soft border border-surface-100 p-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <ApperIcon name="Plus" size={20} className="text-primary-500" />
          </div>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onKeyDown={handleKeyPress}
            placeholder="Add a new task..."
            className="border-none shadow-none focus:ring-0 px-0 py-2 text-lg font-medium placeholder-surface-400"
            containerClassName="flex-1"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0"
          />
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 pt-4 border-t border-surface-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                >
                  {categories.map(category => (
                    <option key={category.Id} value={category.Id.toString()}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setIsExpanded(false)
                  setTitle('')
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!title.trim()}
                icon="Plus"
              >
                Add Task
              </Button>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}

export default TaskQuickAdd