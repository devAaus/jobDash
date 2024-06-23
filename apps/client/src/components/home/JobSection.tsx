"use client"

import React, { useState } from 'react';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from '@/components/ui/select';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { Job } from '@/types';

interface JobSectionProps {
    jobs: Job[];
}

const JobSection: React.FC<JobSectionProps> = ({ jobs }) => {
    const [filter, setFilter] = useState<string>('');

    const handleFilterChange = (jobType: string) => {
        setFilter(jobType === 'all' ? '' : jobType);
    };

    const filteredJobs = filter ? jobs.filter(job => job.location === filter) : jobs;

    return (
        <div>
            <Select value={filter} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="REMOTE">Remote</SelectItem>
                    <SelectItem value="ONSITE">Onsite</SelectItem>
                    <SelectItem value="HYBRID">Hybrid</SelectItem>
                </SelectContent>
            </Select>

            <HoverEffect items={filteredJobs} />
        </div>
    );
}

export default JobSection;
