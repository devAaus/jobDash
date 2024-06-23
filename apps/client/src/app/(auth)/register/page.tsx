"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import SignUpForm from './form'

const scehma = z.object({
    email: z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Email is invalid" }),
    userName: z.string()
        .min(1, { message: "Username is required" })
        .min(3, { message: "Username must be at least 3 characters" }),
    password: z.string()
        .min(1, { message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" }),
})

export type FormFields = z.infer<typeof scehma>;

const Register = () => {

    const router = useRouter()


    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<FormFields>({
        resolver: zodResolver(scehma)
    })

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/signup`, data)
            console.log(res);

            if (res.status === 201) {
                toast.success('Register Successful')
                router.push('/login')
            }
        } catch (error: any) {
            setError("email", { message: error.response.data.email })
            setError("userName", { message: error.response.data.username })
            console.log(error);

        }
    }

    return (
        <div className=' max-w-screen-sm mx-auto'>
            <SignUpForm
                onSubmit={handleSubmit(onSubmit)}
                errors={errors}
                register={register}
                isSubmitting={isSubmitting}
            />
        </div>
    )

}
export default Register