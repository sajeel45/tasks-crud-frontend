import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRequests } from '../../service/ApiRequests';
import { catchAsync } from '../../helpers/detectError';

export const getNewsAsyncThunk = createAsyncThunk(
  'news/getNews',
  catchAsync(async (params) => {
    const response = await ApiRequests.getNews(params);
    return response.data;
  })
);

const initialState = {
  articles: [],
  category: 'general',
  searchQuery: '',
  loading: false,
  error: null,
  totalResults: 0,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsCategory: (state, action) => {
      state.category = action.payload;
    },
    setNewsSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetNewsFilters: (state) => {
      state.category = 'general';
      state.searchQuery = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNewsAsyncThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getNewsAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.articles) {
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults || action.payload.articles.length;
      }
    });
    builder.addCase(getNewsAsyncThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setNewsCategory, setNewsSearchQuery, resetNewsFilters } = newsSlice.actions;

export default newsSlice.reducer;
