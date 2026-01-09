import { useCallback, useContext, useRef, useState } from 'react';
import { WorkspacesContext } from '../context/WorkspacesContext/WorkspacesContext';
import { useApiClient } from './useApiClient';

const extractArray = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.repos)) return payload.repos;
  return [];
};

const extractLanguages = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.languages)) return payload.languages;
  if (Array.isArray(payload?.data?.languages)) return payload.data.languages;
  if (Array.isArray(payload?.data)) {
    if (payload.data.length === 1 && Array.isArray(payload.data[0]?.languages)) {
      return payload.data[0].languages;
    }
    return payload.data;
  }
  return [];
};

export function useWorkspacesApi() {
  const { setWorkspaces } = useContext(WorkspacesContext);
  const { request } = useApiClient();
  const [languagesByWorkspace, setLanguagesByWorkspace] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  const fetchWorkspaces = useCallback(async (force = false) => {
    if (fetchedRef.current && !force) {
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await request('/repos');
      const repos = extractArray(response) || extractArray(response?.data) || [];
      setWorkspaces(repos);
      fetchedRef.current = true;

      const languagePairs = await Promise.all(
        repos.map(async (workspace) => {
          try {
            const langResponse = await request(`/repoLanguages?workspaceId=${workspace._id}`);
            const languages = extractLanguages(langResponse) || extractLanguages(langResponse?.data);
            return [workspace._id, languages];
          } catch (err) {
            return [workspace._id, []];
          }
        })
      );

      setLanguagesByWorkspace(Object.fromEntries(languagePairs));
    } catch (err) {
      setError(err.message || 'Unable to load workspaces');
    } finally {
      setLoading(false);
    }
  }, [request, setWorkspaces]);

  return {
    fetchWorkspaces,
    languagesByWorkspace,
    loading,
    error
  };
}
