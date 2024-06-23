"use client"

import CandidateDetails from '@/components/CandidateDetails';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Candidate } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import MyJobsSection from './MyJobsSection';

const Profile = () => {
    const { auth } = useAuth();
    const [formData, setFormData] = useState<Candidate | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!auth || !auth.accessToken) {
                    throw new Error('Access token not found');
                }
                const accessToken = auth.accessToken;

                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_AUTH_URL}/api/candidate/user/profile`,
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

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            {formData ? (
                <>
                    {/* <Link href={`profile/edit-details/${formData.id}`}>
                        <FaRegEdit size={20} className="text-blue-500" />
                    </Link>
                    <p>FirstName: {formData.firstName}</p>
                    <p>LastName: {formData.lastName}</p>
                    <p>Email: {formData.email}</p>
                    <p>Skills: {formData.skills}</p>
                    <p>Experience: {formData.experience}</p>
                    <p>Education: {formData.education}</p>
                    <p>Website: {formData.website}</p> */}

                    <CandidateDetails user={formData} />
                </>
            ) : (
                <Button>
                    <Link href="profile/add-details">Add</Link>
                </Button>
            )}

            <MyJobsSection />
        </div>
    )
}

export default Profile