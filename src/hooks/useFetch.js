import { useState, useEffect, useCallback } from 'react';

/**
 * A custom hook to handle data fetching, loading, and error states.
 * @param {Function} apiCallFunction - A function that returns a promise (e.g., an axios call).
 * @param {Array} dependencies - An array of dependencies that will trigger a refetch when they change.
 * @returns {{data: any, isLoading: boolean, error: string | null}}
 */
export const useFetch = (apiCallFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setError(null);

    apiCallFunction()
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        console.error("Fetch hook error:", err);
        setError(err.response?.data?.message || "An error occurred while fetching data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
};
