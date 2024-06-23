"use client"

import useRefreshToken from '@/hooks/useRefreshToken';
import { useEffect } from 'react';

const TokenRefresher = () => {
    const refresh = useRefreshToken();

    useEffect(() => {
        const interval = setInterval(refresh, 14 * 60 * 1000);

        return () => clearInterval(interval);
    }, [refresh]);

    return null;
};

export default TokenRefresher;
