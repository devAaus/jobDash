"use client"
import JobForm from '@/components/JobForm'
import { useAuth } from '@/hooks/useAuth'
import { FormData } from '@/types'
import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

export type RequiredFormData = Required<FormData>;

const AddJobComponent = () => {
    const { auth } = useAuth()

    const [formData, setFormData] = useState<RequiredFormData>({
        title: '',
        desc: '',
        compName: '',
        compAddress: '',
        location: '',
        level: '',
        experience: '',
        salary: '',
        skills: '',
        expiryDate: '',
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            if (!auth?.accessToken) {
                throw new Error('User not authenticated');
            }

            const accessToken = auth.accessToken;

            // Convert expiryDate to a Date instance
            const dataToSend = { ...formData, expiryDate: new Date(formData.expiryDate) };

            const res = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/job`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            });

            if (res.status === 201) {
                toast.success('Job submitted successfully');
                setFormData({
                    title: '',
                    desc: '',
                    compName: '',
                    compAddress: '',
                    location: '',
                    level: '',
                    experience: '',
                    salary: '',
                    skills: '',
                    expiryDate: '',
                });
            }

        } catch (error) {
            console.error('Error adding job:', error);
            toast.error('Failed to submit the job');
        }
    };

    return (
        <div className=' container max-w-screen-sm mx-auto'>
            <JobForm
                formData={formData}
                handleSubmit={handleSubmit}
                setFormData={setFormData}
            />
        </div>
    )
}

export default AddJobComponent
