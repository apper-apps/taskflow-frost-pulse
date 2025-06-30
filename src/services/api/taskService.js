const tableName = 'task';

export const taskService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "category_id" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "created_at" } },
          { field: { Name: "order" } }
        ],
        orderBy: [
          { fieldName: "completed", sorttype: "ASC" },
          { fieldName: "priority", sorttype: "ASC" },
          { fieldName: "due_date", sorttype: "ASC" }
        ]
      };
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "category_id" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "created_at" } },
          { field: { Name: "order" } }
        ]
      };
      
      const response = await apperClient.getRecordById(tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching task with ID ${id}:`, error);
      throw error;
    }
  },

  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include Updateable fields for creation
      const taskRecord = {
        Name: taskData.title || taskData.Name || '',
        Tags: taskData.Tags || '',
        Owner: taskData.Owner,
        title: taskData.title || '',
        description: taskData.description || '',
        priority: taskData.priority || 'medium',
        category_id: parseInt(taskData.categoryId) || parseInt(taskData.category_id),
        due_date: taskData.dueDate || taskData.due_date || null,
        completed: taskData.completed || false,
        completed_at: taskData.completedAt || taskData.completed_at || null,
        created_at: taskData.createdAt || taskData.created_at || new Date().toISOString(),
        order: taskData.order || 0
      };
      
      const params = {
        records: [taskRecord]
      };
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          console.error(`Failed to create task:${JSON.stringify([result])}`);
          throw new Error(result.message || 'Failed to create task');
        }
        return result.data;
      }
      
      throw new Error('No data returned from create operation');
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include Updateable fields for update
      const updateRecord = {
        Id: parseInt(id)
      };
      
      // Map updateable fields
      if (updates.title !== undefined) updateRecord.title = updates.title;
      if (updates.Name !== undefined) updateRecord.Name = updates.Name;
      if (updates.Tags !== undefined) updateRecord.Tags = updates.Tags;
      if (updates.Owner !== undefined) updateRecord.Owner = updates.Owner;
      if (updates.description !== undefined) updateRecord.description = updates.description;
      if (updates.priority !== undefined) updateRecord.priority = updates.priority;
      if (updates.categoryId !== undefined) updateRecord.category_id = parseInt(updates.categoryId);
      if (updates.category_id !== undefined) updateRecord.category_id = parseInt(updates.category_id);
      if (updates.dueDate !== undefined) updateRecord.due_date = updates.dueDate;
      if (updates.due_date !== undefined) updateRecord.due_date = updates.due_date;
      if (updates.completed !== undefined) updateRecord.completed = updates.completed;
      if (updates.completedAt !== undefined) updateRecord.completed_at = updates.completedAt;
      if (updates.completed_at !== undefined) updateRecord.completed_at = updates.completed_at;
      if (updates.createdAt !== undefined) updateRecord.created_at = updates.createdAt;
      if (updates.created_at !== undefined) updateRecord.created_at = updates.created_at;
      if (updates.order !== undefined) updateRecord.order = updates.order;
      
      const params = {
        records: [updateRecord]
      };
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          console.error(`Failed to update task:${JSON.stringify([result])}`);
          throw new Error(result.message || 'Failed to update task');
        }
        return result.data;
      }
      
      throw new Error('No data returned from update operation');
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          console.error(`Failed to delete task:${JSON.stringify([result])}`);
          throw new Error(result.message || 'Failed to delete task');
        }
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Additional utility methods
  async getByCategory(categoryId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "category_id" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } }
        ],
        where: [
          {
            FieldName: "category_id",
            Operator: "EqualTo",
            Values: [parseInt(categoryId)]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error('Error fetching tasks by category:', error);
      return [];
    }
  }
};