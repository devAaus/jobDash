"use client"

import CandidateForm from '@/components/CandidateForm';
import { useAuth } from '@/hooks/useAuth';
import { CandidateFormData } from '@/types';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const EditRecruiterDetails = () => {
   const { id } = useParams()
   const { auth } = useAuth()
   const router = useRouter()
   const [loading, setLoading] = useState<boolean>(true);

   const [formData, setformData] = useState<CandidateFormData>({
      firstName: '',
      lastName: '',
      email: '',
      skills: '',
      experience: '',
      education: '',
      website: ''
   })


   useEffect(() => {

      const fetchProfile = async () => {
         try {
            if (!auth || !auth.accessToken) {
               throw new Error('Access token not found')
            }
            const accessToken = auth.accessToken

            const res = await axios.get(
               `${process.env.NEXT_PUBLIC_AUTH_URL}/api/candidate/${id}`,
               {
                  headers: {
                     Authorization: `Bearer ${accessToken}`,
                  },
                  withCredentials: true,
               }
            );

            if (res.data) {
               setformData(res.data);
            }
         } catch (error) {
            console.error('Error fetching recruiter profile:', error);
            toast.error('An error occurred while fetching recruiter profile');
         } finally {
            setLoading(false);
         }
      };

      fetchProfile();
   }, [auth, id]);


   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         if (!auth || !auth.accessToken) {
            throw new Error('Access token not found');
         }
         const accessToken = auth.accessToken;

         const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_AUTH_URL}/api/candidate/${id}`,
            formData,
            {
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
               withCredentials: true,
            }
         );

         if (res.data) {
            toast.success('Profile updated successfully');
            router.push('/dashboard/candidate/profile');
         }
      } catch (error) {
         console.error('Error updating recruiter profile:', error);
         toast.error('An error occurred while updating recruiter profile');
      }
   };

   if (loading) {
      return <div>Loading...</div>
   }

   return (
      <div>
         <h1>Update Details</h1>
         <CandidateForm formData={formData} setFormData={setformData} handleSubmit={handleSubmit} />
      </div>
   )
}

export default EditRecruiterDetails