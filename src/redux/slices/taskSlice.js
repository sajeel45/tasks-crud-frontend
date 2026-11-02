import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRequests } from '../../service/ApiRequests';
import { catchAsync } from '../../helpers/detectError';
import { toast } from 'react-toastify';

export const getTasksAsyncThunk = createAsyncThunk(
  'tasks/getTasks',
  catchAsync(async (params) => {
    const response = await ApiRequests.getTasks(params);
    return response.data;
  })
);

export const getTaskStatsAsyncThunk = createAsyncThunk(
  'tasks/getStats',
  catchAsync(async () => {
    const response = await ApiRequests.getTaskStats();
    return response.data;
  })
);

export const createTaskAsyncThunk = createAsyncThunk(
  'tasks/createTask',
  catchAsync(async ({ data, onSuccess }) => {
    const response = await ApiRequests.createTask(data);
    toast.success('Task created successfully! 🎉');
    if (onSuccess) onSuccess(response.data);
    return response.data;
  })
);

export const updateTaskAsyncThunk = createAsyncThunk(
  'tasks/updateTask',
  catchAsync(async ({ id, data, onSuccess }) => {
    const response = await ApiRequests.updateTask(id, data);
    toast.success('Task updated successfully! ✨');
    if (onSuccess) onSuccess(response.data);
    return response.data;
  })
);

export const toggleTaskCompleteAsyncThunk = createAsyncThunk(
  'tasks/toggleTaskComplete',
  catchAsync(async ({ id, onSuccess }) => {
    const response = await ApiRequests.toggleTaskComplete(id);
    const isCompleted = response.data.isCompleted;
    if (isCompleted) {
      toast.success('Task marked as completed! 🚀');
    } else {
      toast.info('Task marked as pending 📝');
    }
    if (onSuccess) onSuccess(response.data);
    return response.data;
  })
);

export const deleteTaskAsyncThunk = createAsyncThunk(
  'tasks/deleteTask',
  catchAsync(async ({ id, onSuccess }) => {
    const response = await ApiRequests.deleteTask(id);
    toast.success('Task deleted successfully! 🗑️');
    if (onSuccess) onSuccess(id);
    return { id, data: response.data };
  })
);

const initialState = {
  tasks: {
    results: [],
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0,
  },
  stats: {
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
    completionRate: 0,
  },
  filters: {
    search: '',
    status: 'all',
    priority: 'all',
    page: 1,
    limit: 10,
    sortBy: 'createdAt:desc',
  },
  loading: false,
  statsLoading: false,
  actionLoading: false,
  error: null,
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilterStatus: (state, action) => {
      state.filters.status = action.payload;
      state.filters.page = 1;
    },
    setFilterPriority: (state, action) => {
      state.filters.priority = action.payload;
      state.filters.page = 1;
    },
    setSearchQuery: (state, action) => {
      state.filters.search = action.payload;
      state.filters.page = 1;
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        search: '',
        status: 'all',
        priority: 'all',
        page: 1,
        limit: 10,
        sortBy: 'createdAt:desc',
      };
    },
  },
  extraReducers: (builder) => {
    // getTasks
    builder.addCase(getTasksAsyncThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTasksAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.tasks = action.payload;
      }
    });
    builder.addCase(getTasksAsyncThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // getTaskStats
    builder.addCase(getTaskStatsAsyncThunk.pending, (state) => {
      state.statsLoading = true;
    });
    builder.addCase(getTaskStatsAsyncThunk.fulfilled, (state, action) => {
      state.statsLoading = false;
      if (action.payload) {
        state.stats = action.payload;
      }
    });
    builder.addCase(getTaskStatsAsyncThunk.rejected, (state) => {
      state.statsLoading = false;
    });

    // createTask
    builder.addCase(createTaskAsyncThunk.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(createTaskAsyncThunk.fulfilled, (state, action) => {
      state.actionLoading = false;
      if (action.payload) {
        state.tasks.results.unshift(action.payload);
        state.tasks.totalResults += 1;
      }
    });
    builder.addCase(createTaskAsyncThunk.rejected, (state) => {
      state.actionLoading = false;
    });

    // updateTask
    builder.addCase(updateTaskAsyncThunk.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(updateTaskAsyncThunk.fulfilled, (state, action) => {
      state.actionLoading = false;
      if (action.payload) {
        const index = state.tasks.results.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks.results[index] = action.payload;
        }
      }
    });
    builder.addCase(updateTaskAsyncThunk.rejected, (state) => {
      state.actionLoading = false;
    });

    // toggleTaskComplete
    builder.addCase(toggleTaskCompleteAsyncThunk.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.tasks.results.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks.results[index] = action.payload;
        }
      }
    });

    // deleteTask
    builder.addCase(deleteTaskAsyncThunk.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(deleteTaskAsyncThunk.fulfilled, (state, action) => {
      state.actionLoading = false;
      if (action.payload?.id) {
        state.tasks.results = state.tasks.results.filter((t) => t.id !== action.payload.id);
        state.tasks.totalResults = Math.max(0, state.tasks.totalResults - 1);
      }
    });
    builder.addCase(deleteTaskAsyncThunk.rejected, (state) => {
      state.actionLoading = false;
    });
  },
});

export const {
  setFilterStatus,
  setFilterPriority,
  setSearchQuery,
  setPage,
  setSortBy,
  resetFilters,
} = taskSlice.actions;

export default taskSlice.reducer;
