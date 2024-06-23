import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { Job } from '@/types'
import { IoTimeOutline } from 'react-icons/io5'
import { differenceInDays } from 'date-fns'
import { useAuth } from "@/hooks/useAuth"
import { Avatar, AvatarFallback } from "../ui/avatar"

interface JobCardProps {
    job: Job
    handleDelete: (id: number) => void
    status?: string
}

const JobCardforDashboard = ({ job, handleDelete, status }: JobCardProps) => {
    const { auth } = useAuth()
    const role = auth?.role

    const daysLeft = differenceInDays(new Date(job.expiryDate), new Date());
    const jobLink = role === "RECRUITER" ? `/dashboard/recruiter/jobs/${job.id}` : `/jobs/${job.id}`;

    return (
        <Link href={jobLink}>
            <Card className='capitalize'>
                <CardHeader className="flex flex-row items-center gap-3">
                    <Avatar>
                        <AvatarFallback>
                            {job.compName.substring(0, 1)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{job.title}</CardTitle>
                        <p className='text-sm text-primary'>{job.compName}</p>
                    </div>
                </CardHeader>

                <CardContent>
                    <CardDescription>{job.desc.substring(0, 60)}{job.desc.length > 60 ? '...' : ''}</CardDescription>
                </CardContent>

                <CardFooter className='space-y-2'>
                    <div className='w-full flex space-x-4 items-center justify-between'>
                        <div className="flex items-center gap-2">
                            <IoTimeOutline size={20} />
                            <p className='text-sm'>
                                {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                            </p>
                        </div>

                        {role === "RECRUITER" && (
                            <div className="flex space-x-2 items-center">
                                <Link href={`/dashboard/recruiter/jobs/edit-jobs/${job.id}`}>
                                    <FaRegEdit size={20} className="text-blue-500" />
                                </Link>

                                <MdDeleteOutline
                                    size={20}
                                    className="text-red-500 cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete(job.id);
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {role === "CANDIDATE" &&
                        <h1
                            className={`text-white p-1 rounded-md 
                                        ${status === "APPLIED"
                                    ? 'bg-primary/30'
                                    : status === "SELECTED"
                                        ? 'bg-green-500/60'
                                        : 'bg-red-500/60'}`}>
                            {status}
                        </h1>
                    }
                </CardFooter>
            </Card>
        </Link>
    )
}

export default JobCardforDashboard