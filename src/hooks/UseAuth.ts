import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import ErrorModel from '../interfaces/models/ErrorModel';

export default function UseAuth() {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState<null | ErrorModel>(null);

  let navigate = useNavigate();

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

  const registerUser = async () => {};

  const loginUser = async () => {};

  const logoutUser = () => {};

  return { registerUser, loginUser, logoutUser, error };
}
