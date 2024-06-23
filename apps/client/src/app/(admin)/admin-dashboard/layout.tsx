"use client"

import { useAuth } from '@/hooks/useAuth';
import { redirect, usePathname } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';

type layoutProps = {
    children: ReactNode
}

const Layout = ({ children }: layoutProps) => {

    const { auth } = useAuth();
    const pathname = usePathname();
    const isAuthenticated = !!auth?.accessToken;
    const role = auth?.role
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                redirect('/login');
            } else if (role !== "ADMIN") {
                redirect('/');
            }
        }
    }, [loading, isAuthenticated, role, pathname]);

    useEffect(() => {
        setLoading(false);
    }, [auth]);

    return (
        <div>{loading ? "Loading..." : children}</div>
    )
}

export default Layout