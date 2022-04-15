import axios from 'axios';
import { User, UserUpdate } from '../interfaces/models/UserModels';
import { ProcessError } from '../utils/Request';
import ErrorModel from '../interfaces/models/ErrorModel';

const API_URL: string | undefined = process.env.REACT_APP_API_URL;

class UserService {
  /**
   * Get User by Username
   * @param username
   */
  async getUserByUsername(username: string): Promise<User | ErrorModel> {
    return axios
      .get(`${API_URL}/user/username/${username}`)
      .then((res) => res.data as User)
      .catch(ProcessError);
  }

  /**
   * Get User by Id
   * @param id Id of the User
   */
  async getUserById(id: number): Promise<User | ErrorModel> {
    return axios
      .get(`${API_URL}/user/id/${id}`)
      .then((res) => res.data as User)
      .catch(ProcessError);
  }

  /**
   * Put User by Id
   * @param id Id of the User
   * @param body Updated fields of the User
   */
  putUserById(id: number, body: UserUpdate): Promise<boolean | ErrorModel> {
    return axios
      .put(`${API_URL}/user/id/${id}`, body)
      .then((res) => res.status === 204)
      .catch(ProcessError);
  }

  /**
   * Delete User by Id
   * @param id Id of the User
   */
  deleteUserById(id: number): Promise<boolean | ErrorModel> {
    return axios
      .delete(`${API_URL}/user/id/${id}`)
      .then((res) => res.status === 204)
      .catch(ProcessError);
  }
}

export default new UserService();
