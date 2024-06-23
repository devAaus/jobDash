
import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { IoLocationOutline } from "react-icons/io5";
import { FaBriefcase, FaDollarSign } from 'react-icons/fa';
import { FiBarChart } from "react-icons/fi";
import { Button } from './ui/button';
import { Job } from '@/types';
import { Avatar, AvatarFallback } from './ui/avatar';
import Link from 'next/link';


type jobdetailsprops = {
    formData: Job
    handleApply: (e: React.FormEvent) => void;
    role: string | undefined
    isApplying: boolean
}

const JobDetails = ({ formData, handleApply, role, isApplying }: jobdetailsprops) => {
    return (
        <Card className=' hover:shadow-none capitalize'>
            <CardHeader className='flex flex-row gap-2 items-center'>
                <Avatar className='rounded-xl'>
                    <AvatarFallback>
                        {formData.compName.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className='space-y-1'>
                    <CardTitle>{formData.title}</CardTitle>
                    <p className='text-sm text-primary'>{formData.compName}</p>

                    <div className='flex flex-row items-center gap-1'>
                        <IoLocationOutline />
                        <p className='text-sm text-gray-400'>{formData.compAddress}</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-8 py-6 border-b border-gray-100'>
                    <div className="flex gap-3">
                        <IoLocationOutline
                            className="flex h-12 w-14 items-center justify-center rounded-lg bg-primary/10 text-2xl text-primary p-2"
                        />

                        <span className="flex flex-col gap-2">
                            <span className='text-xs text-gray-400'>Location</span>
                            <p className='font-medium capitalize'>
                                {formData.location.toLowerCase()}
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
                                {formData.level.toLowerCase()}
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
                                {formData.experience}
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
                                {formData.salary}
                            </p>
                        </span>
                    </div>
                </div>

                <div className='py-6 space-y-2'>
                    <p className='text-base font-semibold'>Job Description</p>
                    <p className='text-sm text-gray-500' >{formData.desc}</p>
                </div>

                <div className='py-6 space-y-2'>
                    <p className='text-base font-semibold'>Requirements</p>
                    <p className='text-sm text-gray-500' >{formData.skills}</p>
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
            </CardFooter>

        </Card>

    )
}

export default JobDetails