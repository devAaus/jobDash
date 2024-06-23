import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Job } from '@/types'
import { Avatar, AvatarFallback } from './ui/avatar'
import { IoTimeOutline } from 'react-icons/io5'
import { differenceInDays } from 'date-fns'

interface JobCardProps {
    item: Job
}

const JobCard = ({ item, }: JobCardProps) => {

    const daysLeft = differenceInDays(new Date(item.expiryDate), new Date());

    return (
        <Card className="hover:shadow-none capitalize">
            <CardHeader className="flex flex-row items-center gap-3">
                <Avatar>
                    <AvatarFallback>
                        {item.compName.substring(0, 1)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>{item.title}</CardTitle>
                    <p className='text-sm text-primary'>{item.compName}</p>
                </div>
            </CardHeader>

            <CardContent>
                <CardDescription>
                    {item.desc.substring(0, 60)}{item.desc.length > 60 ? '...' : ''}
                </CardDescription>
            </CardContent>

            <CardFooter className="flex items-center gap-2">
                <IoTimeOutline size={20} />
                <p className='text-sm'>
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                </p>
            </CardFooter>
        </Card>
    )
}

export default JobCard
