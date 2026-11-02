import { combineReducers } from '@reduxjs/toolkit';
import tasks from './slices/taskSlice';
import news from './slices/newsSlice';
import model from './layoutSlices/modelSlice';
import error from './errors/handleErrorsAndPayloads';

const rootReducer = combineReducers({
  tasks,
  news,
  model,
  error,
});

export default rootReducer;
