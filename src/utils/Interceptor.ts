import axios, { AxiosRequestConfig } from 'axios';
import AuthService from '../services/AuthService';

const API_URL: string | undefined = process.env.REACT_APP_API_URL;

/**
 * Attach Bearer Auth to all requests in API_URL
 * @constructor
 */
export function JWTInterceptor() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const header = AuthService.getAuthHeader();
    const isOurAPI = config.url?.startsWith(API_URL || 'unknown:api_url');

    if (isOurAPI && header && config.headers) {
      config.headers['Authorization'] = header.Authorization;
    }

    return config;
  });
}
