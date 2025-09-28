import { useState, useCallback } from 'react';
import { APIError } from '@/utils/api';

interface UseApiCallState<T> {
  data: T | null;
  loading: boolean;
  error: APIError | Error | null;
}

interface UseApiCallReturn<T> extends UseApiCallState<T> {
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

export function useApiCall<T>(
  apiFunction: (...args: any[]) => Promise<T>
): UseApiCallReturn<T> {
  const [state, setState] = useState<UseApiCallState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const result = await apiFunction(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (error) {
        const apiError = error instanceof APIError ? error : new Error(String(error));
        setState(prev => ({ ...prev, loading: false, error: apiError }));
        throw error;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}