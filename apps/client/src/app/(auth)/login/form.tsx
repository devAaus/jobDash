import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormFields } from './page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';

type LoginFormProps = {
    register: UseFormRegister<FormFields>;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    errors: FieldErrors<FormFields>;
    isSubmitting: boolean;
};

const LoginForm = ({ register, onSubmit, errors, isSubmitting }: LoginFormProps) => {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader >
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form action="" onSubmit={onSubmit} className='grid gap-4'>
                    <div className='grid gap-4'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            type='text'
                            placeholder='m@example.com'
                            {...register('email')}
                            className='rounded-md'
                        />
                        {errors.email?.message && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>

                    <div className='grid gap-4'>
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <Input
                            id='password'
                            type='password'
                            {...register('password')}
                            className='rounded-md'
                        />
                        {errors.password?.message && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>

                    <Button variant='default' type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                </form>

                <Button variant="outline" className="w-full mt-4 flex items-center gap-2">
                    <FaGoogle />
                    Login with Google
                </Button>

                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
