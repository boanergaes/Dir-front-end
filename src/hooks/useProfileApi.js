import { useCallback, useContext, useState } from 'react';
import { ProfileContext } from '../context/ProfileContext/ProfileContext';
import { UserContext } from '../context/UserContext/UserContext';
import { useApiClient } from './useApiClient';

const pullData = (payload) => {
  if (!payload) return null;
  if (payload.data) return payload.data;
  if (payload?.data?.data) return payload.data.data;
  return payload;
};

export function useProfileApi() {
  const { setProfile } = useContext(ProfileContext);
  const { setUser } = useContext(UserContext);
  const { request } = useApiClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const USER_ID = '69563538bd45b3713e795fdc';

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await request(`/users/${USER_ID}`);
      const profile = pullData(response);
      setProfile(profile);
      setUser(profile);
      return profile;
    } catch (err) {
      setError(err.message || 'Unable to load profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [request, setProfile, setUser]);

  const updateProfile = useCallback(async (updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await request(`/users/${USER_ID}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      });
      const profile = pullData(response);
      setProfile(profile);
      setUser(profile);
      return profile;
    } catch (err) {
      setError(err.message || 'Unable to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [request, setProfile, setUser]);

  const updatePreferences = useCallback(async (preferences) => {
    setLoading(true);
    setError(null);
    try {
      const response = await request(`/users/${USER_ID}`, {
        method: 'PATCH',
        body: JSON.stringify({ preferences })
      });
      const pref = pullData(response);
      setProfile((prev) => ({ ...(prev || {}), preferences: pref }));
      setUser((prev) => ({ ...(prev || {}), preferences: pref }));
      return pref;
    } catch (err) {
      setError(err.message || 'Unable to update preferences');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [request, setProfile, setUser]);

  return {
    loadProfile,
    updateProfile,
    updatePreferences,
    loading,
    error
  };
}
