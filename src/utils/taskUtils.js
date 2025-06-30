export const getPriorityOrder = (priority) => {
  const order = { urgent: 0, high: 1, medium: 2, low: 3 }
  return order[priority] ?? 2
}

export const sortTasks = (tasks) => {
  return [...tasks].sort((a, b) => {
    // Completed tasks go to bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }

    // Sort by priority
    const aPriority = getPriorityOrder(a.priority)
    const bPriority = getPriorityOrder(b.priority)
    
    if (aPriority !== bPriority) {
      return aPriority - bPriority
    }

    // Then by due date (earliest first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate)
    }
    if (a.dueDate) return -1
    if (b.dueDate) return 1

    // Finally by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
}

export const filterTasks = (tasks, filters = {}) => {
  return tasks.filter(task => {
    // Search
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }

    // Category
    if (filters.categoryId && task.categoryId !== filters.categoryId) {
      return false
    }

    // Priority
    if (filters.priority && task.priority !== filters.priority) {
      return false
    }

    // Status
    if (filters.status === 'completed' && !task.completed) {
      return false
    }
    if (filters.status === 'active' && task.completed) {
      return false
    }

    // Date filters
    if (filters.dateFilter === 'today') {
      const today = new Date().toISOString().split('T')[0]
      const taskDate = task.dueDate ? task.dueDate.split('T')[0] : null
      if (taskDate !== today) {
        return false
      }
    }

    if (filters.dateFilter === 'upcoming') {
      const today = new Date()
      const taskDate = task.dueDate ? new Date(task.dueDate) : null
      if (!taskDate || taskDate <= today) {
        return false
      }
    }

    return true
  })
}

export const getTaskStats = (tasks) => {
  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const active = total - completed
  const overdue = tasks.filter(t => 
    !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
  ).length

  return {
    total,
    completed,
    active,
    overdue,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  }
}

export const groupTasksByDate = (tasks) => {
  const groups = {
    overdue: [],
    today: [],
    tomorrow: [],
    thisWeek: [],
    later: [],
    noDate: []
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const weekEnd = new Date(today)
  weekEnd.setDate(weekEnd.getDate() + 7)

  tasks.forEach(task => {
    if (!task.dueDate) {
      groups.noDate.push(task)
      return
    }

    const dueDate = new Date(task.dueDate)
    dueDate.setHours(0, 0, 0, 0)

    if (dueDate < today) {
      groups.overdue.push(task)
    } else if (dueDate.getTime() === today.getTime()) {
      groups.today.push(task)
    } else if (dueDate.getTime() === tomorrow.getTime()) {
      groups.tomorrow.push(task)
    } else if (dueDate <= weekEnd) {
      groups.thisWeek.push(task)
    } else {
      groups.later.push(task)
    }
  })

  return groups
}