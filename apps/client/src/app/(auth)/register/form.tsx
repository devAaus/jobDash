import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormFields } from './page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

type SignUpFormProps = {
    register: UseFormRegister<FormFields>;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    errors: FieldErrors<FormFields>;
    isSubmitting: boolean;
}

const SignUpForm = ({ register, onSubmit, errors, isSubmitting }: SignUpFormProps) => {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action="" onSubmit={onSubmit} className='grid gap-4'>

                    <div className='grid gap-4'>
                        <Label htmlFor='userName'>UserName</Label>
                        <Input
                            type='text'
                            placeholder='Max123'
                            {...register('userName')}
                            className='rounded-md'
                        />
                        {errors.userName?.message && <p className='text-red-500 ml-1'>{errors.userName.message}</p>}
                    </div>

                    <div className='grid gap-4'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            type='text'
                            placeholder='m@example.com'
                            {...register('email')}
                            className='rounded-md'
                        />
                        {errors.email?.message && <p className='text-red-500 ml-1'>{errors.email.message}</p>}
                    </div>

                    <div className='grid gap-4'>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                            type='password'
                            {...register('password')}
                            className='rounded-md'
                        />
                        {errors.password?.message && <p className='text-red-500 ml-1'>{errors.password.message}</p>}
                    </div>

                    <Button variant='default' type='submit' disabled={isSubmitting}>
                        {isSubmitting ? "Creating...." : "Create an account"}
                    </Button>
                </form>

                <Button variant="outline" className="w-full mt-4 flex items-center gap-2">
                    <FaGoogle />
                    Login with Google
                </Button>

                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default SignUpForm