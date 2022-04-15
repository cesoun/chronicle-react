import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import ErrorModel, {
  InstanceOfErrorModel,
} from '../interfaces/models/ErrorModel';
import SignUpModel from '../interfaces/models/SignUpModel';
import LoginModel from '../interfaces/models/LoginModel';

export default function UseAuth() {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState<null | ErrorModel>(null);

  let navigate = useNavigate();

  /**
   * Set the Context from the token.
   */
  const setUserContext = () => {
    const token = AuthService.decodeToken();
    if (token) {
      setUser(token);
      navigate('/');
    } else {
      setError({
        error: true,
        msg: 'missing access token',
      });
      setUser(null);
    }
  };

  /**
   * Register a User and navigate to /login on success.
   * @param signUp
   */
  const registerUser = async (signUp: SignUpModel) => {
    const res = await AuthService.register(signUp);
    if (InstanceOfErrorModel(res)) {
      setError(res as ErrorModel);
    } else {
      navigate('/login');
    }
  };

  /**
   * Login a User and navigate to SetUserContext on success.
   * @param login
   */
  const loginUser = async (login: LoginModel) => {
    const res = await AuthService.login(login);
    if (InstanceOfErrorModel(res)) {
      setError(res as ErrorModel);
    } else {
      setUserContext();
    }
  };

  const logoutUser = () => {
    AuthService.logout();
    setUserContext();
  };

  return { registerUser, loginUser, logoutUser, error };
}
