import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import TaskQuickAdd from '@/components/molecules/TaskQuickAdd'
import TaskList from '@/components/organisms/TaskList'
import { taskService } from '@/services/api/taskService'
import { categoryService } from '@/services/api/categoryService'
import { toast } from 'react-toastify'

const Dashboard = ({ filter: propFilter }) => {
  const { categoryId } = useParams()
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  // Determine the active filter
  const activeFilter = categoryId ? 'category' : propFilter

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const handleAddTask = async (taskData) => {
    try {
      await taskService.create(taskData)
      setRefreshKey(prev => prev + 1) // Trigger TaskList refresh
      toast.success('Task added successfully!')
    } catch (error) {
      toast.error('Failed to add task')
      console.error('Error adding task:', error)
    }
  }

  const getPageTitle = () => {
    if (categoryId) {
      const category = categories.find(c => c.Id.toString() === categoryId)
      return category ? category.name : 'Category Tasks'
    }
    
    switch (propFilter) {
      case 'today':
        return 'Today\'s Tasks'
      case 'upcoming':
        return 'Upcoming Tasks'
      case 'completed':
        return 'Completed Tasks'
      default:
        return 'All Tasks'
    }
  }

  const getPageDescription = () => {
    if (categoryId) {
      return 'Tasks in this category'
    }
    
    switch (propFilter) {
      case 'today':
        return 'Tasks due today'
      case 'upcoming':
        return 'Tasks due in the future'
      case 'completed':
        return 'Your completed tasks'
      default:
        return 'All your tasks in one place'
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 bg-white border-b border-surface-200">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-2xl font-bold font-display text-surface-900">
              {getPageTitle()}
            </h1>
            <p className="text-surface-600 mt-1">
              {getPageDescription()}
            </p>
          </motion.div>

          {/* Hide quick add for completed tasks view */}
          {activeFilter !== 'completed' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <TaskQuickAdd 
                onAddTask={handleAddTask}
                categories={categories}
              />
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TaskList
              key={refreshKey}
              searchTerm={searchTerm}
              categoryFilter={categoryId}
              priorityFilter={priorityFilter}
              statusFilter={activeFilter}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard