"use client"


import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import RecruiterForm from '../form';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Email is invalid" }),
    location: z.string().min(1, { message: "Location is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    website: z.string().min(1, { message: "Website is required" })
})

export type RecruiterFormFields = z.infer<typeof schema>;

const AddRecruiterDetails = () => {

    const { auth } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RecruiterFormFields>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<RecruiterFormFields> = async (data) => {
        try {
            if (!auth?.accessToken) {
                throw new Error('User not authenticated');
            }
            const accessToken = auth.accessToken;
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/recruiter`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            );
            if (res.status === 201) {
                router.push('/dashboard/recruiter/profile');
            }
        } catch (error) {
            console.error('Error Adding profile:', error);
            toast.error('An error occurred while Adding the profile');
        }
    };

    return (
        <div className='py-4'>
            <RecruiterForm
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit(onSubmit)}
            />
        </div>

    )
}

export default AddRecruiterDetails