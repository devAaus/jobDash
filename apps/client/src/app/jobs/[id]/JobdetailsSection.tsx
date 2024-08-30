"use client";

import React, { useState } from 'react';
import JobDetails from '@/components/JobDetails';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IoLocationOutline } from 'react-icons/io5';
import { Job } from '@/types';

const JobdetailsSection = ({ data }: { data: Job }) => {
    const { auth } = useAuth();
    const [isApplying, setIsApplying] = useState<boolean>(false);

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsApplying(true);
        try {
            if (!auth?.accessToken) {
                throw new Error('User not authenticated');
            }
            const accessToken = auth.accessToken;
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/selection`,
                {
                    status: 'APPLIED',
                    jobId: Number(data.id),
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            );
            if (res.status === 201) {
                toast.success('Applied for job successfully');
            }
        } catch (error: any) {
            console.error('Error applying for job:', error);
            toast.error(error.response.data.message);
        } finally {
            setIsApplying(false);
        }
    };

    return (
        <div className="space-y-3">
            <JobDetails formData={data} handleApply={handleApply} role={auth?.role} isApplying={isApplying} />

            <Card className="hover:shadow-none capitalize">
                <CardHeader className='space-y-1'>
                    <h3>About Company</h3>
                    <CardTitle>{data?.compName}</CardTitle>
                    <div className='flex flex-row items-center gap-1'>
                        <IoLocationOutline />
                        <p className='text-sm text-gray-400'>{data.compAddress}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        {data?.compName} provides innovative technology solutions for businesses of all sizes, specializing in cloud computing, cybersecurity, and IT consulting
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    );
};

export default JobdetailsSection;
