import { useEffect, useState } from 'react';

export function useCityStatistic<T>(selectedCity: string, fetchStatistic: (city: string) => Promise<T>) {
  const [ data, setData ] = useState<T | null>(null);
  const [ error, setError ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setError(null);
      setLoading(true);
      try {
        const result = await fetchStatistic(selectedCity);
        if (!cancelled) setData(result);
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Unknown error');
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (selectedCity) {
      fetchData();
    }

    return () => {
      cancelled = true; // saving from race conditions
    };
  }, [ selectedCity, fetchStatistic ]);

  return { data, error, loading };
}