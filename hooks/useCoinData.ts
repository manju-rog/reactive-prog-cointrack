
import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchTopCoins } from '../services/cryptoService';
import { Coin } from '../types';

export const useCoinData = (isLive: boolean) => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isFetching = useRef<boolean>(false);

    const fetchData = useCallback(async () => {
        if (isFetching.current) return;
        isFetching.current = true;
        if (coins.length === 0) setIsLoading(true);

        try {
            const newCoins = await fetchTopCoins();
            setCoins(newCoins);
            if (error) setError(null); // Clear previous error on a successful fetch
        } catch (e) {
            setError(e as Error);
            console.error(e);
        } finally {
            setIsLoading(false);
            isFetching.current = false;
        }
    }, [error, coins.length]);

    useEffect(() => {
        // Stop any existing intervals before starting a new logic path
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Perform an initial fetch immediately
        fetchData();

        if (isLive) {
            // Start live updates
            intervalRef.current = setInterval(fetchData, 3000);
        }

        // Cleanup function to clear interval on component unmount or when `isLive` changes.
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLive, fetchData]);

    return { coins, error, isLoading };
};
