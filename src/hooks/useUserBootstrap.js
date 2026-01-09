import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext/UserContext';
import { useApiClient } from './useApiClient';

export function useUserBootstrap() {
  const { setUser } = useContext(UserContext);
  const { request } = useApiClient();
  const USER_ID = '69563538bd45b3713e795fdc';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await request(`/users/${USER_ID}`);
      const user = response?.data || response;
      setUser(user);
      return user;
    } catch (err) {
      setError(err.message || 'Unable to load user');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [request, setUser]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return { loading, error, reload: loadUser };
}
