import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { CandidateFormData } from '@/types';

type CandidateFormProps = {
    formData: CandidateFormData,
    setFormData: React.Dispatch<React.SetStateAction<CandidateFormData>>;
    handleSubmit: (e: React.FormEvent) => void
}

const CandidateForm = ({ formData, setFormData, handleSubmit }: CandidateFormProps) => {
    return (
        <form className='space-y-2' onSubmit={handleSubmit}>
            <Input
                type='text'
                placeholder='First Name'
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
            />

            <Input
                type='text'
                placeholder='Last Name'
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
            />

            <Input
                type='text'
                placeholder='Email Address'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />

            <Input
                type='text'
                placeholder='Skills e.g. ReactJS, NextJS, NodeJS, JavaScript, etc'
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                required
            />

            <Input
                type='text'
                placeholder='Experience e.g. 1 year as Software Developer'
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                required
            />

            <Input
                type='text'
                placeholder='Education e.g. Bachelor in Computer Science'
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                required
            />

            <Input
                type='text'
                placeholder='Website e.g. https://example.com'
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                required
            />

            <Button>Save</Button>
        </form>
    )
}

export default CandidateForm