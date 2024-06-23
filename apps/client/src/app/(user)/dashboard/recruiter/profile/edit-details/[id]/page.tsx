"use client"

import { useAuth } from '@/hooks/useAuth';
import { RecruiterFormData } from '@/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import RecruiterForm from '../../form'; // Replace with the correct path to RecruiterForm

const EditRecruiterDetails = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<RecruiterFormData>();



    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!auth || !auth.accessToken) {
                    throw new Error('Access token not found');
                }
                const accessToken = auth.accessToken;

                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_AUTH_URL}/api/recruiter/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        withCredentials: true,
                    }
                );

                if (res.data) {
                    setValue('name', res.data.name);
                    setValue('email', res.data.email);
                    setValue('location', res.data.location);
                    setValue('description', res.data.description);
                    setValue('website', res.data.website);
                }
            } catch (error) {
                console.error('Error fetching recruiter profile:', error);
                toast.error('An error occurred while fetching recruiter profile');
            }
        };

        fetchProfile();
        setLoading(false);
    }, [auth, id, setValue]);

    const onSubmit: SubmitHandler<RecruiterFormData> = async (data) => {
        try {
            if (!auth || !auth.accessToken) {
                throw new Error('Access token not found');
            }
            const accessToken = auth.accessToken;

            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/recruiter/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            );

            if (res.data) {
                toast.success('Profile updated successfully');
            }
        } catch (error) {
            console.error('Error updating recruiter profile:', error);
            toast.error('An error occurred while updating recruiter profile');
        }
    };

    return (
        <div className='py-4'>
            <RecruiterForm
                register={register}
                errors={{}}
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit(onSubmit)}
            />
        </div>
    );
};

export default EditRecruiterDetails;
