"use client"

import JobCardforDashboard from '@/components/dashboard/JobCardforDashboard'
import { useAuth } from '@/hooks/useAuth'
import { Job } from '@/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const MyJobs = () => {

    const { auth } = useAuth()
    const [jobs, setJobs] = useState<Job[]>([]);




    useEffect(() => {

        const fetchData = async () => {
            try {
                if (!auth || !auth.accessToken) {
                    throw new Error('Access token not found')
                }
                const accessToken = auth.accessToken

                const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/job/user/jobs`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    withCredentials: true
                })
                setJobs(res.data)
            } catch (error) {
                console.error('Error fetching jobs:', error)
                toast.error('Error fetching jobs')
            }
        }

        fetchData()
    }, [auth])

    const handleDelete = async (id: number) => {
        try {
            if (!auth?.accessToken) {
                throw new Error('User not authenticated')
            }

            const accessToken = auth.accessToken

            const res = await axios.delete(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/job/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            if (res.status === 200) {
                toast.success('Job deleted successfully')
            }
        } catch (error) {
            console.error('Error deleting job:', error)
        }
    }

    return (
        <div className='w-full p-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4'>
                {jobs.map((job) => (
                    <JobCardforDashboard key={job.id} job={job} handleDelete={handleDelete} />
                ))}
            </div>
        </div>
    )
}

export default MyJobs