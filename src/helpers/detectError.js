import { toast } from 'react-toastify';
import { setError } from '../redux/errors/handleErrorsAndPayloads';

export const detectError = (error, dispatch, rejectWithValue) => {
  const errorMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    'Something went wrong. Please try again.';

  const statusCode = error?.response?.status || 500;

  if (dispatch) {
    dispatch(
      setError({
        errorCode: statusCode,
        errorMessage,
      })
    );
  } else {
    toast.error(errorMessage);
  }

  if (rejectWithValue) {
    return rejectWithValue({ message: errorMessage, statusCode });
  }
};

export const catchAsync = (fn) => (_, api) => {
  return Promise.resolve(fn(_, api)).catch((error) => {
    return detectError(error, api?.dispatch, api?.rejectWithValue);
  });
};
