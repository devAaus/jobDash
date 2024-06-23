"use client";

import JobCardforDashboard from '@/components/dashboard/JobCardforDashboard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { getJob } from '@/services/axios.service';
import { Job, Selection } from '@/types';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const MyJobsSection = () => {
    const { auth } = useAuth();
    const [selection, setSelection] = useState<Selection[]>([]);
    const [jobData, setJobData] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('all');

    const getSelections = useCallback(async () => {
        try {
            setLoading(true);
            if (!auth?.accessToken) {
                throw new Error('User not authenticated');
            }
            const accessToken = auth.accessToken;

            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/selection/user/selection`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                withCredentials: true
            });

            if (res.status === 200) {
                setSelection(res.data);
            } else {
                throw new Error('Failed to fetch selections');
            }
        } catch (error) {
            console.error('Error fetching selections:', error);
        } finally {
            setLoading(false);
        }
    }, [auth?.accessToken]);

    const fetchData = useCallback(async () => {
        try {
            const data = await getJob();
            setJobData(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    }, []);

    useEffect(() => {
        getSelections();
        fetchData();
    }, [getSelections, fetchData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const statusMap: { [key: number]: string } = selection.reduce((map, sel) => {
        map[sel.jobId] = sel.status;
        return map;
    }, {} as { [key: number]: string });

    const selectedJobIds = selection.map(s => s.jobId);
    let filteredJobData = jobData.filter((job) => selectedJobIds.includes(job.id));

    if (filter !== 'all') {
        filteredJobData = filteredJobData.filter((job) => statusMap[job.id] === filter);
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold px-4 mt-6 mb-2'>Applied Jobs</h1>

                <div className='w-1/6'>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="APPLIED">Applied</SelectItem>
                            <SelectItem value="SELECTED">Selected</SelectItem>
                            <SelectItem value="REJECTED">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredJobData.map((job) => (
                    <JobCardforDashboard
                        key={job.id}
                        job={job}
                        handleDelete={() => { }}
                        status={statusMap[job.id]}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyJobsSection;
