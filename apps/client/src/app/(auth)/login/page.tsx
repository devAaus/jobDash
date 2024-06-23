"use client"

import { useAuth } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import LoginForm from './form';

const schema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Email is invalid" }),
    password: z.string().min(1, { message: "Password is required" })
});

export type FormFields = z.infer<typeof schema>;

const Login = () => {
    const router = useRouter();
    const { setAuth } = useAuth();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<FormFields>({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/signin`, data);
            const { accessToken, refreshToken, role } = res.data;

            if (res.status === 200) {
                const authData = { accessToken, refreshToken, role };
                localStorage.setItem('auth', JSON.stringify(authData));
                setAuth(authData);
                router.push('/');
            }

        } catch (error: any) {
            setError("email", { message: "Invalid email or password" });
            setError("password", { message: "Invalid email or password" });
        }
    };

    return (
        <div className='max-w-screen-sm mx-auto'>
            <LoginForm
                onSubmit={handleSubmit(onSubmit)}
                errors={errors}
                register={register}
                isSubmitting={isSubmitting}
            />
        </div>
    );
};

export default Login;
