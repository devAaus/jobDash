"use client"

import CandidateForm from '@/components/CandidateForm';
import { useAuth } from '@/hooks/useAuth';
import { CandidateFormData } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const AddCandidateDetails = () => {
    const { auth } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState<CandidateFormData>({
        firstName: '',
        lastName: '',
        email: '',
        skills: '',
        experience: '',
        education: '',
        website: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!auth?.accessToken) {
                throw new Error('User not authenticated');
            }
            const accessToken = auth.accessToken;
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/candidate`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            );
            if (res.status === 201) {
                toast.success('Details Added successfully');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    skills: '',
                    experience: '',
                    education: '',
                    website: ''
                });
                router.push('/dashboard/candidate/profile');
            }
        } catch (error) {
            console.error('Error Adding profile:', error);
            toast.error('An error occurred while Adding the profile');
        }
    };
    return (
        <div>
            AddCandidateDetails
            <CandidateForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
        </div>
    )
}

export default AddCandidateDetails