import { useMemo, useCallback } from 'react';
import { BASE_URL as SERVICE_BASE_URL, USE_MOCK } from '../services/api/api';

const defaultHeaders = {
  'Content-Type': 'application/json'
};

const pickData = (payload) => {
  if (!payload) return null;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return payload.data || payload;
};

export function useApiClient() {
  const baseUrl = useMemo(() => SERVICE_BASE_URL || 'http://localhost:5000', []);

  const request = useCallback(async (endpoint, options = {}) => {
    const config = {
      ...options,
      headers: { ...defaultHeaders, ...(options.headers || {}) }
    };

    if (!USE_MOCK) {
      config.credentials = 'include';
    }

    const response = await fetch(`${baseUrl}${endpoint}`, config);
    let parsed;

    try {
      parsed = await response.json();
    } catch (err) {
      parsed = null;
    }

    if (!response.ok) {
      const message = parsed?.message || `Request failed with status ${response.status}`;
      throw new Error(message);
    }

    if (parsed?.status) {
      return parsed;
    }

    return {
      status: 'success',
      data: pickData(parsed),
      message: parsed?.message
    };
  }, [baseUrl]);

  return { request, baseUrl, pickData };
}
