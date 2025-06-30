const tableName = 'category';

export const categoryService = {
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
          { field: { Name: "color" } },
          { field: { Name: "task_count" } },
          { field: { Name: "order" } }
        ],
        orderBy: [
          { fieldName: "order", sorttype: "ASC" }
        ]
      };
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
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
          { field: { Name: "color" } },
          { field: { Name: "task_count" } },
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
      console.error(`Error fetching category with ID ${id}:`, error);
      throw error;
    }
  },

  async create(categoryData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include Updateable fields for creation
      const categoryRecord = {
        Name: categoryData.name || categoryData.Name || '',
        Tags: categoryData.Tags || '',
        Owner: categoryData.Owner,
        color: categoryData.color || '#5B4EE9',
        task_count: categoryData.taskCount || categoryData.task_count || 0,
        order: categoryData.order || 0
      };
      
      const params = {
        records: [categoryRecord]
      };
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          console.error(`Failed to create category:${JSON.stringify([result])}`);
          throw new Error(result.message || 'Failed to create category');
        }
        return result.data;
      }
      
      throw new Error('No data returned from create operation');
    } catch (error) {
      console.error('Error creating category:', error);
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
      if (updates.name !== undefined) updateRecord.Name = updates.name;
      if (updates.Name !== undefined) updateRecord.Name = updates.Name;
      if (updates.Tags !== undefined) updateRecord.Tags = updates.Tags;
      if (updates.Owner !== undefined) updateRecord.Owner = updates.Owner;
      if (updates.color !== undefined) updateRecord.color = updates.color;
      if (updates.taskCount !== undefined) updateRecord.task_count = updates.taskCount;
      if (updates.task_count !== undefined) updateRecord.task_count = updates.task_count;
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
          console.error(`Failed to update category:${JSON.stringify([result])}`);
          throw new Error(result.message || 'Failed to update category');
        }
        return result.data;
      }
      
      throw new Error('No data returned from update operation');
    } catch (error) {
      console.error('Error updating category:', error);
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
          console.error(`Failed to delete category:${JSON.stringify([result])}`);
          throw new Error(result.message || 'Failed to delete category');
        }
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
};