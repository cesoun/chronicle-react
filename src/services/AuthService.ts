import * as jose from 'jose';
import { JWTPayload } from 'jose';
import axios from 'axios';
import { ProcessError } from '../utils/Request';
import ErrorModel from '../interfaces/models/ErrorModel';
import SignUpModel from '../interfaces/models/SignUpModel';
import LoginModel from '../interfaces/models/LoginModel';
import TokenModel from '../interfaces/models/TokenModel';

const API_URL: string | undefined = process.env.API_URL;

export interface BearerHeader {
  Authorization: string;
}

class AuthService {
  async register(signUp: SignUpModel): Promise<any | ErrorModel> {
    return axios
      .post(`${API_URL}/register`, signUp)
      .then((res) => res.status === 204)
      .catch(ProcessError);
  }

  async login(login: LoginModel): Promise<void | ErrorModel> {
    return axios
      .post(`${API_URL}/login`, login)
      .then((res) => {
        this.setToken(res.data as TokenModel);
      })
      .catch(ProcessError);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setToken(token: TokenModel): void {
    localStorage.setItem('accessToken', token.access);
  }

  decodeToken(): JWTPayload | null {
    const token = this.getToken();
    return token ? jose.decodeJwt(token) : null;
  }

  getAuthHeader(): BearerHeader | null {
    const token = this.getToken();
    if (token) {
      return { Authorization: 'Bearer ' + token };
    }

    return null;
  }
}

export default new AuthService();
