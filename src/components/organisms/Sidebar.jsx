import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import CategoryPill from '@/components/molecules/CategoryPill'
import Button from '@/components/atoms/Button'
import { categoryService } from '@/services/api/categoryService'
import { taskService } from '@/services/api/taskService'

const Sidebar = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([])
  const [taskCounts, setTaskCounts] = useState({})
  const location = useLocation()

  useEffect(() => {
    loadCategories()
    loadTaskCounts()
  }, [])

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const loadTaskCounts = async () => {
    try {
      const tasks = await taskService.getAll()
      const today = new Date().toISOString().split('T')[0]
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      
      const counts = {
        all: tasks.filter(t => !t.completed).length,
        today: tasks.filter(t => 
          !t.completed && t.dueDate && t.dueDate.split('T')[0] === today
        ).length,
        upcoming: tasks.filter(t => 
          !t.completed && t.dueDate && new Date(t.dueDate) > tomorrow
        ).length,
        completed: tasks.filter(t => t.completed).length
      }

      // Category counts
      categories.forEach(category => {
        counts[`category-${category.Id}`] = tasks.filter(t => 
          !t.completed && t.categoryId === category.Id.toString()
        ).length
      })

      setTaskCounts(counts)
    } catch (error) {
      console.error('Error loading task counts:', error)
    }
  }

  const navigationItems = [
    {
      path: '/',
      label: 'All Tasks',
      icon: 'List',
      count: taskCounts.all || 0,
      exact: true
    },
    {
      path: '/today',
      label: 'Today',
      icon: 'Calendar',
      count: taskCounts.today || 0
    },
    {
      path: '/upcoming',
      label: 'Upcoming',
      icon: 'Clock',
      count: taskCounts.upcoming || 0
    },
    {
      path: '/completed',
      label: 'Completed',
      icon: 'CheckCircle',
      count: taskCounts.completed || 0
    }
  ]

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white border-r border-surface-200">
      {/* Header */}
      <div className="p-6 border-b border-surface-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold font-display text-surface-900">TaskFlow</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon="X"
            onClick={onClose}
            className="lg:hidden"
          />
        </div>
        <p className="text-sm text-surface-600 mt-1">Smart Task Management</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">
              Views
            </h2>
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <ApperIcon name={item.icon} size={18} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    location.pathname === item.path
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-surface-100 text-surface-500 group-hover:bg-surface-200'
                  }`}>
                    {item.count}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {categories.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
                  Categories
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="Plus"
                  className="p-1"
                  onClick={() => console.log('Add category')}
                />
              </div>
              <div className="space-y-1">
                {categories.map((category) => (
                  <NavLink
                    key={category.Id}
                    to={`/category/${category.Id}`}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                      }`
                    }
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium truncate">{category.name}</span>
                    </div>
                    {(taskCounts[`category-${category.Id}`] || 0) > 0 && (
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        location.pathname === `/category/${category.Id}`
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-surface-100 text-surface-500 group-hover:bg-surface-200'
                      }`}>
                        {taskCounts[`category-${category.Id}`]}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-surface-100">
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <ApperIcon name="Zap" size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-surface-900">Stay Productive</p>
            <p className="text-xs text-surface-600">Complete tasks daily</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 w-64 h-full z-50 lg:hidden"
      >
        {sidebarContent}
      </motion.div>
    </>
  )
}

export default Sidebar