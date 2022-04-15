import { AxiosError } from 'axios';
import ErrorModel from '../interfaces/models/ErrorModel';

export function ProcessError(error: AxiosError): ErrorModel {
  // status code error
  if (error.response) return error.response.data as ErrorModel;

  // no response error
  if (error.request) return { error: true, msg: 'no response from server' };

  // unknown error occurred
  return { error: true, msg: error.message };
}
