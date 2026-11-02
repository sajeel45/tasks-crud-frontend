import apiService from './index';
import { APIurls } from './constants';

export const ApiRequests = {
  // Tasks CRUD API
  getTasks: async (params) => await apiService.get(APIurls.tasks, { params }),
  getTaskStats: async () => await apiService.get(APIurls.tasksStats),
  getTaskById: async (id) => await apiService.get(APIurls.taskById(id)),
  createTask: async (data) => await apiService.post(APIurls.tasks, data),
  updateTask: async (id, data) => await apiService.patch(APIurls.taskById(id), data),
  toggleTaskComplete: async (id) => await apiService.patch(APIurls.toggleComplete(id)),
  deleteTask: async (id) => await apiService.delete(APIurls.taskById(id)),

  // Open News API
  getNews: async (params) => await apiService.get(APIurls.news, { params }),
};
