import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  errorMessage: null,
  errorCode: null,
};

export const handleErrorSlice = createSlice({
  name: 'handleErrors',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
      state.errorCode = action.payload.errorCode;
      toast.error(action.payload.errorMessage || 'An error occurred');
    },
    resetError: (state) => {
      state.errorMessage = null;
      state.errorCode = null;
    },
  },
});

export const { setError, resetError } = handleErrorSlice.actions;
export default handleErrorSlice.reducer;
