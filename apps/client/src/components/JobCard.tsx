"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Job } from '@/types'
import { IoLocationOutline } from 'react-icons/io5'
import { Button } from "./ui/button"
import Link from "next/link"
import { FiBarChart } from "react-icons/fi"
import { FaBriefcase, FaDollarSign } from "react-icons/fa"
import { useAuth } from "@/hooks/useAuth"
import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"

interface JobCardProps {
    item: Job
}

const JobCard = ({ item }: JobCardProps) => {
    const { auth } = useAuth();
    const [isApplying, setIsApplying] = useState<boolean>(false);
    const role = auth?.role

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsApplying(true);
        try {
            if (!auth?.accessToken) {
                throw new Error('User not authenticated');
            }
            const accessToken = auth.accessToken;
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/selection`,
                {
                    status: 'APPLIED',
                    jobId: Number(item.id),
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            );
            if (res.status === 201) {
                toast.success('Application submitted successfully');
            }
        } catch (error: any) {
            console.error('Error applying for job:', error);
            toast.error(error.response.data.message);
        } finally {
            setIsApplying(false);
        }
    };

    return (
        <Card className="hover:shadow-none capitalize my-3 border-2 border-black">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <CardHeader className="flex flex-row gap-2 items-center">
                            <CardTitle>{item.title}</CardTitle>
                            <p className='text-sm text-primary'>{item.compName}</p>
                            <div className='flex flex-row items-center gap-1'>
                                <IoLocationOutline />
                                <p className='text-sm text-gray-500'>{item.compAddress}</p>
                            </div>
                        </CardHeader>
                    </AccordionTrigger>
                    <AccordionContent>
                        <CardContent>
                            <div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-8 py-6 border-b border-gray-100'>
                                <div className="flex gap-3">
                                    <IoLocationOutline
                                        className="flex h-12 w-14 items-center justify-center rounded-lg bg-primary/10 text-2xl text-primary p-2"
                                    />

                                    <span className="flex flex-col gap-2">
                                        <span className='text-xs text-gray-400'>Location</span>
                                        <p className='font-medium capitalize'>
                                            {item.location.toLowerCase()}
                                        </p>
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <FiBarChart
                                        className="flex h-12 w-14 items-center justify-center rounded-lg bg-primary/10 text-2xl text-primary p-2"
                                    />

                                    <span className="flex flex-col gap-2">
                                        <span className='text-xs text-gray-400'>Level</span>
                                        <p className='font-medium capitalize'>
                                            {item.level.toLowerCase()}
                                        </p>
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <FaBriefcase
                                        className="flex h-12 w-14 items-center justify-center rounded-lg bg-primary/10 text-2xl text-primary p-2"
                                    />

                                    <span className="flex flex-col gap-2">
                                        <span className='text-xs text-gray-400'>Experience</span>
                                        <p className='font-medium'>
                                            {item.experience}
                                        </p>
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <FaDollarSign
                                        className="flex h-12 w-14 items-center justify-center rounded-lg bg-primary/10 text-2xl text-primary p-2"
                                    />

                                    <span className="flex flex-col gap-2">
                                        <span className='text-xs text-gray-400'>Salary</span>
                                        <p className='font-medium'>
                                            {item.salary}
                                        </p>
                                    </span>
                                </div>
                            </div>

                            <div className='py-6 space-y-2'>
                                <p className='text-base font-semibold'>Job Description</p>
                                <p className='text-sm text-gray-500' >{item.desc}</p>
                            </div>

                            <div className='py-6 space-y-2'>
                                <p className='text-base font-semibold'>Requirements</p>
                                <p className='text-sm text-gray-500' >{item.skills}</p>
                            </div>

                        </CardContent>

                        <CardFooter>
                            {role ? (
                                <Button
                                    onClick={handleApply}
                                    disabled={role === "RECRUITER" || isApplying}
                                    className='hover:shadow-md'
                                >
                                    {isApplying ? 'Applying...' : 'Apply'}
                                </Button>
                            ) : (
                                <Link href="/login">
                                    <Button>
                                        Apply
                                    </Button>
                                </Link>
                            )}
                            {/* <Button
                                className='hover:shadow-md bg-blue-600'
                            >
                                Apply
                            </Button> */}
                        </CardFooter>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


        </Card>

    )
}

export default JobCard
