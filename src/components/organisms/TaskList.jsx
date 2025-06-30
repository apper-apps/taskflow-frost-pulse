import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from '@/components/molecules/TaskCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { taskService } from '@/services/api/taskService'
import { categoryService } from '@/services/api/categoryService'
import { toast } from 'react-toastify'

const TaskList = ({ searchTerm, categoryFilter, priorityFilter, statusFilter }) => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ])
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      setError('Failed to load tasks. Please try again.')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      const updatedTask = await taskService.update(taskId, {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      })
      
      setTasks(prevTasks =>
        prevTasks.map(t => t.Id === taskId ? updatedTask : t)
      )
    } catch (err) {
      toast.error('Failed to update task')
      console.error('Error updating task:', err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.delete(taskId)
        setTasks(prevTasks => prevTasks.filter(t => t.Id !== taskId))
        toast.success('Task deleted successfully')
      } catch (err) {
        toast.error('Failed to delete task')
        console.error('Error deleting task:', err)
      }
    }
  }

  const handleEditTask = (task) => {
    // This would open an edit modal or form
    toast.info('Edit functionality coming soon!')
  }

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Category filter
    if (categoryFilter && task.categoryId !== categoryFilter) {
      return false
    }

    // Priority filter
    if (priorityFilter && task.priority !== priorityFilter) {
      return false
    }

    // Status filter
    if (statusFilter === 'completed' && !task.completed) {
      return false
    }
    if (statusFilter === 'active' && task.completed) {
      return false
    }
    if (statusFilter === 'today') {
      const today = new Date().toISOString().split('T')[0]
      const taskDate = task.dueDate ? task.dueDate.split('T')[0] : null
      if (taskDate !== today) {
        return false
      }
    }
    if (statusFilter === 'upcoming') {
      const today = new Date()
      const taskDate = task.dueDate ? new Date(task.dueDate) : null
      if (!taskDate || taskDate <= today) {
        return false
      }
    }

    return true
  })

  // Sort tasks: incomplete first, then by priority, then by due date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Completed tasks go to bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }

    // Priority order: urgent, high, medium, low
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
    const aPriority = priorityOrder[a.priority] ?? 2
    const bPriority = priorityOrder[b.priority] ?? 2
    
    if (aPriority !== bPriority) {
      return aPriority - bPriority
    }

    // Then by due date (earliest first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate)
    }
    if (a.dueDate) return -1
    if (b.dueDate) return 1

    // Finally by creation date
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadData} />
  if (sortedTasks.length === 0) {
    return <Empty 
      title="No tasks found"
      description={searchTerm || categoryFilter || priorityFilter || statusFilter 
        ? "Try adjusting your filters or search terms"
        : "Add your first task to get started"
      }
      actionText="Add Task"
      onAction={() => toast.info('Use the quick add form above to create your first task!')}
    />
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {sortedTasks.map((task) => {
          const category = categories.find(c => c.Id.toString() === task.categoryId)
          return (
            <motion.div key={task.Id} className="group">
              <TaskCard
                task={task}
                category={category}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default TaskList