import { mockCategories } from '@/services/mockData/categories.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage for demo purposes
let categories = [...mockCategories]

export const categoryService = {
  async getAll() {
    await delay(250)
    return [...categories]
  },

  async getById(id) {
    await delay(200)
    const category = categories.find(c => c.Id === parseInt(id))
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  },

  async create(categoryData) {
    await delay(350)
    
    // Generate new ID
    const maxId = Math.max(...categories.map(c => c.Id), 0)
    const newCategory = {
      Id: maxId + 1,
      ...categoryData,
      taskCount: 0,
      order: categories.length
    }
    
    categories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, updates) {
    await delay(300)
    
    const index = categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    categories[index] = { ...categories[index], ...updates }
    return { ...categories[index] }
  },

  async delete(id) {
    await delay(250)
    
    const index = categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    const deletedCategory = categories[index]
    categories.splice(index, 1)
    return { ...deletedCategory }
  }
}