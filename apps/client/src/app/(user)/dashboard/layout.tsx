"use client"

import UserTabs from '@/components/UserTabs';
import { useAuth } from '@/hooks/useAuth';
import { redirect, usePathname } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';

type LayoutProps = {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const { auth } = useAuth();
    const pathname = usePathname();
    const isAuthenticated = !!auth?.accessToken;
    const role = auth?.role.toLowerCase();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                redirect('/login');
            } else if (role) {
                const newPath = `/dashboard/${role}`;
                if (!pathname.includes(newPath)) {
                    redirect(newPath);
                }
            } else {
                redirect('/');
            }
        }
    }, [loading, isAuthenticated, role, pathname]);

    useEffect(() => {
        setLoading(false);
    }, [auth]);

    return (
        <div>
            {loading ? (
                "Loading..."
            ) : (
                <div>
                    <h3 className='text-3xl font-extrabold text-center py-6'>Dashboard</h3>
                    {role === "recruiter" && <UserTabs />}
                    {children}
                </div>
            )}
        </div>
    );
}

export default Layout;
