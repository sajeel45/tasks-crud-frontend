import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskModal: {
    isOpen: false,
    mode: 'create', // 'create' | 'edit'
    task: null,
  },
  deleteModal: {
    isOpen: false,
    taskId: null,
    taskTitle: '',
  },
};

export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    openTaskModal: (state, action) => {
      state.taskModal = {
        isOpen: true,
        mode: action.payload?.mode || 'create',
        task: action.payload?.task || null,
      };
    },
    closeTaskModal: (state) => {
      state.taskModal = {
        isOpen: false,
        mode: 'create',
        task: null,
      };
    },
    openDeleteModal: (state, action) => {
      state.deleteModal = {
        isOpen: true,
        taskId: action.payload?.taskId || null,
        taskTitle: action.payload?.taskTitle || '',
      };
    },
    closeDeleteModal: (state) => {
      state.deleteModal = {
        isOpen: false,
        taskId: null,
        taskTitle: '',
      };
    },
  },
});

export const { openTaskModal, closeTaskModal, openDeleteModal, closeDeleteModal } = modelSlice.actions;
export default modelSlice.reducer;
