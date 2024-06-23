import React from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FormData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { usePathname } from 'next/navigation';

type JobFormProps = {
    handleSubmit: (e: React.FormEvent) => void;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const JobForm = ({ handleSubmit, formData, setFormData }: JobFormProps) => {

    const pathname = usePathname();

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl'>
                    {pathname.includes("add-jobs") ? 'Add Job' : 'Update Job'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form className='grid gap-4' onSubmit={handleSubmit}>
                    <Input
                        type='text'
                        placeholder='Job Title'
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />

                    <Input
                        type='text'
                        placeholder='Company Name'
                        value={formData.compName}
                        onChange={(e) => setFormData({ ...formData, compName: e.target.value })}
                        required
                    />

                    <Input
                        type='text'
                        placeholder='Company Address'
                        value={formData.compAddress}
                        onChange={(e) => setFormData({ ...formData, compAddress: e.target.value })}
                        required
                    />

                    <div className='flex gap-2'>
                        <Select
                            value={formData.location}
                            onValueChange={(value) => setFormData({ ...formData, location: value })}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="REMOTE">Remote</SelectItem>
                                <SelectItem value="ONSITE">Onsite</SelectItem>
                                <SelectItem value="HYBRID">Hybrid</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={formData.level}
                            onValueChange={(value) => setFormData({ ...formData, level: value })}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ENTRY">Entry</SelectItem>
                                <SelectItem value="JUNIOR">Junior</SelectItem>
                                <SelectItem value="MID">Mid</SelectItem>
                                <SelectItem value="SENIOR">Senior</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Input
                        type='text'
                        placeholder='Job experience e.g:1 Year'
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        required
                    />

                    <Input
                        type='text'
                        placeholder='Salary'
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        required
                    />
                    <Textarea
                        placeholder='Job Description'
                        value={formData.desc}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                        required
                    />

                    <Textarea
                        placeholder='Requirements e.g. Proficiency in ReactJS, NextJS, NodeJS, JavaScript, etc'
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        required
                        className='min-h-[80px]'
                    />

                    <Input
                        type='date'
                        placeholder='Deadline'
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        required
                    />

                    <Button type='submit'>
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default JobForm;
