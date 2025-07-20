// import { setError } from '../store/errorSlice';
// import store from '../store/store';
import { AxiosError } from 'axios';
import { setError } from '../redux/slices/errorSlice';
import { store } from '../redux/store';

export const handleError = (error: AxiosError<any>): string | void => {
  const status = error.response?.status;
  const data = error.response?.data;

  switch (status) {
    case 401:
      // 401 Unauthorized
      // לננוט למסך לוגאין
      break;

    case 403:
      // 403 Forbidden
      // בעתיד אם היה יותר דפים מהערכת אז אפשר להוסיף ניוות
      break;

    case 404:
      // 404 Not Found – אפשר להוסיף ניווט בעתיד
      // בעתיד אם היה יותר דפים מהערכת אז אפשר להוסיף ניוות
      store.dispatch(setError({ errMessage: data }));
      break;

    case 409:
      // 409 Conflict
      store.dispatch(setError({ errMessage: data }));
      break;

    default:
      return error.message || 'An unknown error occurred.';
  }
};
