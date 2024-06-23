"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

const UserTabs = () => {
    const pathName = usePathname();

    const tabs = [
        { name: 'Profile', path: `/dashboard/recruiter/profile` },
        { name: 'My Jobs', path: `/dashboard/recruiter/jobs` }
    ];

    return (
        <div className='w-1/2 mx-auto grid grid-cols-2 p-1 gap-3 bg-muted rounded-2xl my-2'>
            {tabs.map((tab) => (
                <Button
                    key={tab.path}
                    asChild
                    className={pathName.includes(tab.path) ? 'rounded-2xl bg-black text-white' : 'bg-muted text-text hover:bg-black/10 rounded-2xl'}
                >
                    <Link href={tab.path}>
                        {tab.name}
                    </Link>
                </Button>
            ))}
        </div>
    );
}

export default UserTabs;
