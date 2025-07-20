import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { handleError } from './error.service';

export const RESPONSE_TYPE_BLOB = 'blob';
const CONTENT_TYPE = 'Content-Type';
const APPLICATION_JSON = 'application/json';
const RESPONSE_TYPE_TEXT = 'text';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const axios: AxiosInstance = Axios.create({
  withCredentials: true,
});

export interface IHttpService {
  get<T>(endpoint: string, data?: any): Promise<T>;
  post<T>(endpoint: string, data: any, URL?: string, responseType?: string): Promise<T>;
  put<T>(endpoint: string, data: any): Promise<T>;
  delete<T>(endpoint: string, data?: any): Promise<T>;
}

export const httpService: IHttpService = {
  get: <T>(endpoint: string, data?: any) => {
    return ajax<T>(endpoint, 'GET', data);
  },
  post: <T>(endpoint: string, data: any, URL?: string, responseType: string = RESPONSE_TYPE_TEXT) => {
    return ajax<T>(endpoint, 'POST', data, URL, responseType);
  },
  put: <T>(endpoint: string, data: any) => {
    return ajax<T>(endpoint, 'PUT', data);
  },
  delete: <T>(endpoint: string, data?: any) => {
    return ajax<T>(endpoint, 'DELETE', data);
  },
};

async function ajax<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data: any = null,
  URL?: string,
  responseType: string = RESPONSE_TYPE_TEXT
): Promise<T> {
  try {
    const jsonData = JSON.stringify(data);
    const config: AxiosRequestConfig = {
      headers: {
        [CONTENT_TYPE]: APPLICATION_JSON,
      },
      url: `http://localhost:5000${endpoint}`,
      method,
      data: jsonData,
      responseType: responseType as any, // ניתן לשפר על ידי טיפוס מותאם אישית
      withCredentials: true,
    };

    const res: AxiosResponse = await axios(config);

    if (res.status !== 200) {
      return JSON.parse(res.data);
    }

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;
    handleError(axiosError);
    throw err;
  }
}
