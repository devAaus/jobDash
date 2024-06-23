import { Candidate } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import Link from 'next/link'
import { FaRegEdit } from 'react-icons/fa'
import { useAuth } from "@/hooks/useAuth"


type Props = {
    user: Candidate | null
}

const CandidateDetails = ({ user }: Props) => {

    const { auth } = useAuth()
    const role = auth?.role


    return (
        <Card>
            <CardHeader className='relative flex flex-row gap-2 items-center'>
                <Avatar className='rounded-xl'>
                    <AvatarFallback>
                        {user?.firstName.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className='space-y-1'>
                    <CardTitle>{user?.firstName + ' ' + user?.lastName}</CardTitle>
                    <p className='text-sm text-primary'>{user?.email}</p>
                </div>

                {role === "CANDIDATE" && <Link href={`profile/edit-details/${user?.id}`} className='absolute top-4 right-4'>
                    <FaRegEdit size={25} className="text-blue-500" />
                </Link>}
            </CardHeader>

            <CardContent>
                <CardDescription className="flex gap-2 items-center">
                    <span className="font-bold text-base text-black">
                        Portfolio:
                    </span>
                    {user?.website}
                </CardDescription>

                <CardDescription className="flex  gap-2 items-center">
                    <span className="font-bold text-base text-black">
                        Experience:
                    </span>
                    {user?.experience}
                </CardDescription>

                <CardDescription className="flex gap-2 items-center">
                    <span className="font-bold text-base text-black">
                        Education:
                    </span>
                    {user?.education}
                </CardDescription>

                <CardDescription className="flex gap-2">
                    <span className="font-bold text-base text-black">
                        Skills:
                    </span>
                    <span className="flex gap-2 flex-wrap">
                        {user?.skills.split(', ').map((skill, index) => (
                            <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
                                {skill}
                            </span>
                        ))}
                    </span>
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default CandidateDetails