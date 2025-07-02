import { useCallback, useEffect, useState } from 'react';
import type { City } from '../components/app/types.ts';
import { fetchCities } from '../utils';

export function useCities() {
    const [ cities, setCities ] = useState<City[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    const getCities = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchCities();
            setCities(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getCities();
    }, [ getCities ]);

    return { cities, loading, error, refetch: getCities };
}
