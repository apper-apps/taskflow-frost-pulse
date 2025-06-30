import { mockTasks } from '@/services/mockData/tasks.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage for demo purposes
let tasks = [...mockTasks]

export const taskService = {
  async getAll() {
    await delay(300)
    return [...tasks]
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(400)
    
    // Generate new ID
    const maxId = Math.max(...tasks.map(t => t.Id), 0)
    const newTask = {
      Id: maxId + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      order: tasks.length
    }
    
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, updates) {
    await delay(300)
    
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    tasks[index] = { ...tasks[index], ...updates }
    return { ...tasks[index] }
  },

  async delete(id) {
    await delay(250)
    
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    const deletedTask = tasks[index]
    tasks.splice(index, 1)
    return { ...deletedTask }
  },

  // Additional utility methods
  async getByCategory(categoryId) {
    await delay(200)
    return tasks.filter(t => t.categoryId === categoryId.toString())
  },

  async getByPriority(priority) {
    await delay(200)
    return tasks.filter(t => t.priority === priority)
  },

  async getCompleted() {
    await delay(200)
    return tasks.filter(t => t.completed)
  },

  async getActive() {
    await delay(200)
    return tasks.filter(t => !t.completed)
  }
}