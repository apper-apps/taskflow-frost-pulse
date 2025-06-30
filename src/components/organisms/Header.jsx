import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'
import ApperIcon from '@/components/ApperIcon'

const Header = ({ onMenuClick, onSearch, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <header className="bg-white border-b border-surface-200 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            icon="Menu"
            onClick={onMenuClick}
            className="lg:hidden"
          />
          
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-surface-900">
              Tasks
            </h1>
            <p className="text-sm text-surface-600">
              Organize your day efficiently
            </p>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-lg mx-4">
          <SearchBar
            onSearch={onSearch}
            placeholder="Search tasks..."
            className="w-full"
          />
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            icon="Filter"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-primary-50 text-primary-600' : ''}
          />
          
          <Button
            variant="ghost"
            size="sm"
            icon="Bell"
            className="relative"
          >
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-500 rounded-full"></span>
          </Button>

          <div className="hidden sm:flex items-center space-x-2 pl-3 border-l border-surface-200">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <ApperIcon name="User" size={16} className="text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-surface-900">You</p>
              <p className="text-surface-600">Personal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-surface-100 px-4 py-3"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-surface-700">Priority:</label>
              <select className="px-3 py-1 border border-surface-200 rounded-md text-sm">
                <option value="">All</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-surface-700">Status:</label>
              <select className="px-3 py-1 border border-surface-200 rounded-md text-sm">
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(false)}
              className="ml-auto"
            >
              Clear Filters
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header