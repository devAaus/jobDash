import { Recruiter } from '@/types'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import { IoLocationOutline } from 'react-icons/io5'
import Link from 'next/link'
import { FaRegEdit } from 'react-icons/fa'

type Props = {
    formData: Recruiter
}

const CompanyDetails = ({ formData }: Props) => {
    return (
        <Card className='hover:shadow-none'>
            <CardHeader className='relative flex flex-row gap-2 items-center'>
                <Avatar className='rounded-xl'>
                    <AvatarFallback>
                        {formData.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className='space-y-1'>
                    <CardTitle>{formData.name}</CardTitle>
                    <p className='text-sm text-primary'>{formData.email}</p>

                    <div className='flex flex-row items-center gap-1'>
                        <IoLocationOutline />
                        <p className='text-sm text-gray-400'>{formData.location}</p>
                    </div>
                </div>

                <Link href={`profile/edit-details/${formData.id}`} className='absolute top-4 right-4'>
                    <FaRegEdit size={25} className="text-blue-500" />
                </Link>
            </CardHeader>

            <CardContent>
                <CardDescription>
                    {formData.description}
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default CompanyDetails