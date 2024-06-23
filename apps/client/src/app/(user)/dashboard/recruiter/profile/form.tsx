import React from 'react'
import { RecruiterFormData } from '@/types'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { RecruiterFormFields } from './add-details/page';
import { usePathname } from 'next/navigation';
import { Label } from '@/components/ui/label';

type RecruiterFormProps = {
    register: UseFormRegister<RecruiterFormFields>;
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    errors: FieldErrors<RecruiterFormFields>;
    isSubmitting: boolean;
}

const RecruiterForm = ({ register, errors, isSubmitting, handleSubmit }: RecruiterFormProps) => {

    const pathName = usePathname();

    return (
        <Card className="mx-auto max-w-2xl">
            <CardHeader >
                <CardTitle className="text-2xl">
                    {pathName === '/dashboard/recruiter/profile/add-details' ? 'Add Company Details' : 'Edit Company Details'}
                </CardTitle>
                <CardDescription>
                    Enter your company details.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form className='grid gap-4' onSubmit={handleSubmit}>
                    <div className='grid gap-2'>
                        <Label htmlFor='name' className='font-semibold'>Company Name</Label>
                        <Input
                            type='text'
                            placeholder='Company Name'
                            {...register('name')}
                        />
                        {errors.name && <p className='text-red-500 ml-1'>{errors.name.message}</p>}
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='email' className='font-semibold'>Company Email</Label>
                        <Input
                            type='text'
                            placeholder='Company Email'
                            {...register('email')}
                        />
                        {errors.email && <p className='text-red-500 ml-1'>{errors.email.message}</p>}
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='location' className='font-semibold'>Company Location</Label>
                        <Input
                            type='text'
                            placeholder='Company Location'
                            {...register('location')}
                        />
                        {errors.location && <p className='text-red-500 ml-1'>{errors.location.message}</p>}
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='description' className='font-semibold'>Company Description</Label>
                        <Textarea
                            placeholder='Company Description'
                            {...register('description')}
                        />
                        {errors.description && <p className='text-red-500 ml-1'>{errors.description.message}</p>}
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='website' className='font-semibold'>Company Website</Label>
                        <Input
                            type='text'
                            placeholder='Company Website'
                            {...register('website')}
                        />
                        {errors.website && <p className='text-red-500 ml-1'>{errors.website.message}</p>}
                    </div>

                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default RecruiterForm