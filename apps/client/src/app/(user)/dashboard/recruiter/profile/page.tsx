"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { Recruiter } from '@/types';
import CompanyDetails from '@/components/CompanyDetails';
import { useRouter } from 'next/navigation';

const RecruiterProfile = () => {
    const { auth } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState<Recruiter | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!auth || !auth.accessToken) {
                    throw new Error('Access token not found');
                }
                const accessToken = auth.accessToken;

                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_AUTH_URL}/api/recruiter/user/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        withCredentials: true,
                    }
                );

                if (res.data) {
                    setFormData(res.data);
                }
            } catch (error) {
                console.error('Error fetching recruiter profile:', error);
                toast.error('An error occurred while fetching the recruiter profile. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [auth]);

    useEffect(() => {
        if (!loading && !formData) {
            router.push('profile/add-details');
        }
    }, [loading, formData, router]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {formData && (
                <CompanyDetails formData={formData} />
            )}
        </div>
    );
};

export default RecruiterProfile;
