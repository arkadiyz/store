// import { setError } from '../store/errorSlice';
// import store from '../store/store';
import { AxiosError } from 'axios';

export const handleError = (error: AxiosError<any>): string | void => {
  const status = error.response?.status;
  //   const data = error.response?.data;

  switch (status) {
    case 401:
      // 401 Unauthorized
      break;

    case 403:
      // 403 Forbidden
      break;

    case 404:
      // 404 Not Found – אפשר להוסיף ניווט בעתיד
      break;

    case 409:
      // 409 Conflict
      break;

    default:
      return error.message || 'An unknown error occurred.';
  }
};
