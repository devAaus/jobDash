"use client"

import React, { useEffect, useState } from 'react'
import JobForm from './JobForm'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { getJobById } from '@/services/axios.service'
import { FormData } from '@/types'

export type RequiredFormData = Required<FormData>;

const EditJobComponent = () => {
   const { id } = useParams()

   const { auth } = useAuth()


   const [formData, setFormData] = useState<RequiredFormData>({
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
   })



   useEffect(() => {
      const getdata = async () => {
         try {
            const data = await getJobById(Number(id))

            setFormData({
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
            })
         } catch (error) {
            console.error('Error fetching jobs:', error);
         }
      }

      getdata()
   }, [id])


   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      try {
         if (!auth?.accessToken) {
            throw new Error('User not authenticated')
         }

         const accessToken = auth.accessToken

         const res = await axios.patch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/job/${id}`, formData, {
            headers: {
               Authorization: `Bearer ${accessToken}`
            }
         })

         if (res.status === 200) {
            toast.success('Job updated successfully')
         } else {
            toast.error('Failed to update job')
         }
      } catch (error) {
         console.error('Error updating job:', error)
         toast.error('Error updating job')
      }
   }

   return (
      <div className='container max-w-screen-sm mx-auto'>
         <JobForm
            formData={formData}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
         />
      </div >
   )
}

export default EditJobComponent