"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import JobDetails from '@/components/JobDetails';
import { getJobById } from '@/services/axios.service';
import { Job, Selection } from '@/types';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import AppliedUserCard from '@/components/AppliedUserCard';

export type RequiredJobData = Required<Job>;

const JobDetail = () => {
    const { id } = useParams();
    const { auth } = useAuth();

    const [formData, setFormData] = useState<RequiredJobData>({
        id: 0,
        title: '',
        desc: '',
        compName: '',
        compAddress: '',
        location: '',
        level: '',
        experience: '',
        skills: '',
        salary: '',
        expiryDate: '',
    });
    const [selection, setSelection] = useState<Selection[]>([]);
    const [loading, setLoading] = useState(false);



    useEffect(() => {

        const getData = async () => {
            try {
                setLoading(true);
                const data = await getJobById(Number(id));
                setFormData({
                    id: 0,
                    title: data.title,
                    desc: data.desc,
                    compName: data.compName,
                    compAddress: data.compAddress,
                    location: data.location,
                    level: data.level,
                    experience: data.experience,
                    skills: data.skills,
                    salary: data.salary,
                    expiryDate: data.expiryDate,
                });
            } catch (error) {
                console.error('Error fetching job details:', error);
                toast.error('Failed to fetch job details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const getSelections = async () => {
            setLoading(true);
            if (!auth?.accessToken) {
                console.error('User not authenticated');
                return;
            }
            try {
                const accessToken = auth.accessToken;
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_AUTH_URL}/api/selection`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    withCredentials: true
                });

                if (res.status === 200) {
                    setSelection(res.data);
                }
            } catch (error) {
                console.error('Error fetching selections:', error);
                toast.error('Failed to fetch user selections. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        getData();
        getSelections();
    }, [id, auth?.accessToken]);

    const handleUpdate = async (selectionId: number, status: string) => {
        try {
            if (!auth?.accessToken) {
                throw new Error('User not authenticated');
            }

            const accessToken = auth.accessToken;

            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/selection/${selectionId}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            );


            // Update the local state to reflect the change
            setSelection((prevSelections) =>
                prevSelections.map((sel) =>
                    sel.id === selectionId ? { ...sel, status } : sel
                )
            );

            toast.success('Selection status updated successfully');
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Failed to update data. Please try again.');
        }
    };

    const filteredData = selection.filter((selection) => selection.jobId === Number(id));

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-12">

            <JobDetails formData={formData} handleApply={() => { }} role={auth?.role} isApplying={false} />


            <section className='space-y-2'>
                <h2 className='text-xl font-bold ml-2'>Applied Candidates</h2>

                <div className='grid grid-cols-1 md:grid-cols-2'>
                    {filteredData.length > 0
                        ? filteredData.map((selection) => (
                            <AppliedUserCard key={selection.id} selection={selection} handleUpdate={handleUpdate} />
                        ))
                        : <p className='px-2'>No candidate has applied for this job</p>
                    }
                </div>
            </section>
        </div>
    );
};

export default JobDetail;
