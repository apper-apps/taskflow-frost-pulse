import { format, isToday, isTomorrow, isYesterday, isThisWeek, isPast, isFuture, differenceInDays } from 'date-fns'

export const formatDate = (date, formatString = 'MMM d, yyyy') => {
  if (!date) return ''
  return format(new Date(date), formatString)
}

export const formatRelativeDate = (date) => {
  if (!date) return ''
  
  const dateObj = new Date(date)
  
  if (isToday(dateObj)) return 'Today'
  if (isTomorrow(dateObj)) return 'Tomorrow'
  if (isYesterday(dateObj)) return 'Yesterday'
  
  if (isThisWeek(dateObj)) {
    return format(dateObj, 'EEEE') // Day name
  }
  
  return format(dateObj, 'MMM d')
}

export const getDueDateStatus = (dueDate) => {
  if (!dueDate) return 'none'
  
  const date = new Date(dueDate)
  const now = new Date()
  
  if (isPast(date) && !isToday(date)) return 'overdue'
  if (isToday(date)) return 'today'
  if (isTomorrow(date)) return 'tomorrow'
  if (isThisWeek(date)) return 'this-week'
  if (isFuture(date)) return 'future'
  
  return 'none'
}

export const getDaysBetween = (startDate, endDate) => {
  return differenceInDays(new Date(endDate), new Date(startDate))
}

export const isOverdue = (dueDate) => {
  if (!dueDate) return false
  return isPast(new Date(dueDate)) && !isToday(new Date(dueDate))
}

export const sortByDate = (items, dateKey = 'createdAt', ascending = true) => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[dateKey])
    const dateB = new Date(b[dateKey])
    return ascending ? dateA - dateB : dateB - dateA
  })
}