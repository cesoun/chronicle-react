import * as jose from 'jose';
import { JWTPayload } from 'jose';
import axios from 'axios';
import { ProcessError } from '../utils/Request';
import ErrorModel from '../interfaces/models/ErrorModel';
import SignUpModel from '../interfaces/models/SignUpModel';
import LoginModel from '../interfaces/models/LoginModel';
import TokenModel from '../interfaces/models/TokenModel';

const API_URL: string | undefined = process.env.REACT_APP_API_URL;

export interface BearerHeader {
  Authorization: string;
}

class AuthService {
  /**
   * Register a User
   * @param signUp
   */
  async register(signUp: SignUpModel): Promise<boolean | ErrorModel> {
    return axios
      .post(`${API_URL}/register`, signUp)
      .then((res) => res.status === 204)
      .catch(ProcessError);
  }

  /**
   * Login a User
   * @param login
   */
  async login(login: LoginModel): Promise<void | ErrorModel> {
    return axios
      .post(`${API_URL}/login`, login)
      .then((res) => {
        this.setToken(res.data as TokenModel);
      })
      .catch(ProcessError);
  }

  /**
   * Logout a User
   */
  logout(): void {
    localStorage.removeItem('accessToken');
  }

  /**
   * Get the Token string
   */
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
   * Set the Token string
   * @param token
   */
  setToken(token: TokenModel): void {
    localStorage.setItem('accessToken', token.access);
  }

  /**
   * Decode the Token to JWTPayload
   */
  decodeToken(): JWTPayload | null {
    const token = this.getToken();
    return token ? jose.decodeJwt(token) : null;
  }

  /**
   * Get the Bearer Token Authorization Header
   */
  getAuthHeader(): BearerHeader | null {
    const token = this.getToken();
    if (token) {
      return { Authorization: 'Bearer ' + token };
    }

    return null;
  }
}

export default new AuthService();
