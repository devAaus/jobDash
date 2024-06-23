"use client"

import JobTable from '@/components/JobTable'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { Job } from '@/types'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'


const Admin = () => {
    const { auth } = useAuth()

    const [jobs, setJobs] = useState<Job[]>([]);

    const getJob = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/job`)
            setJobs(res.data)

        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    }

    useEffect(() => {
        getJob()
    }, [])

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
                getJob()
            }
        } catch (error) {
            console.error('Error deleting job:', error)
        }
    }

    return (
        <div className='space-y-2'>
            <h1>Admin</h1>
            <Button asChild>
                <Link href='/admin-dashboard/add-jobs'>
                    Add Job
                </Link>
            </Button>

            <JobTable job={jobs} handleDelete={handleDelete} />
        </div>
    )
}

export default Admin