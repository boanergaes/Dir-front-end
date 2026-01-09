import { useCallback, useContext, useState } from 'react';
import { WorkspacesContext } from '../context/WorkspacesContext/WorkspacesContext';
import { useApiClient } from './useApiClient';

const extractRepo = (payload) => {
  if (!payload) return null;
  if (payload.data?.data) return payload.data.data;
  if (payload.data) return payload.data;
  return payload;
};

export function useCreateRepositoryApi() {
  const { setWorkspaces } = useContext(WorkspacesContext);
  const { request } = useApiClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRepository = useCallback(async (repoPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await request('/repos', {
        method: 'POST',
        body: JSON.stringify(repoPayload)
      });
      const repo = extractRepo(response);
      const normalizedRepo = {
        ...repoPayload,
        ...repo,
        _id: repo?._id || repo?.id || `repo_${Date.now()}`,
        id: repo?.id || repo?._id || `repo_${Date.now()}`,
        createdAt: repo?.createdAt || new Date().toISOString(),
        updatedAt: repo?.updatedAt || new Date().toISOString(),
        members: repo?.members || [],
        channels: repo?.channels || [],
        tags: repo?.tags || [],
        files: repo?.files || [],
        tasks: repo?.tasks || [],
        isImported: repo?.isImported ?? true,
        stars: repo?.stars || 0
      };
      if (setWorkspaces) {
        setWorkspaces((prev = []) => [...prev, normalizedRepo]);
      }
      return normalizedRepo;
    } catch (err) {
      setError(err.message || 'Unable to create repository');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [request, setWorkspaces]);

  return { createRepository, loading, error };
}
