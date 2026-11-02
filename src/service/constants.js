export const basePath = import.meta.env.VITE_API_BASE_URL || '/api';

export const APIurls = {
  tasks: '/tasks',
  tasksStats: '/tasks/stats',
  taskById: (id) => `/tasks/${id}`,
  toggleComplete: (id) => `/tasks/${id}/toggle-complete`,
  news: '/news',
};
