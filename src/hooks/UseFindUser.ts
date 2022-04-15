import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import { JWTPayload } from 'jose';

export default function UseFindUser() {
  const [user, setUser] = useState<null | JWTPayload>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = AuthService.decodeToken();
    if (token) {
      setUser(token);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  return { user, setUser, isLoading };
}
