"use client";

import React, { useEffect, useState } from 'react';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from '@/components/ui/select';
import { Job } from '@/types';
import JobCard from '../JobCard';
import Search from '../Search';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

interface JobSectionProps {
    jobs: Job[];
}

const JobSection: React.FC<JobSectionProps> = ({ jobs }) => {
    const [filter, setFilter] = useState<string>('');
    const [level, setLevel] = useState<string>(''); // State for job level filter
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchedJobs, setSearchedJobs] = useState<Job[]>([]);

    const handleFilterChange = (jobType: string) => {
        setFilter(jobType === 'all' ? '' : jobType);
    };

    const handleLevelChange = (levelType: string) => {
        setLevel(levelType === 'all' ? '' : levelType);
    };

    const getFilteredJobs = (jobsToFilter: Job[]) => {
        let filtered = jobsToFilter;
        if (filter) {
            filtered = filtered.filter(job => job.location === filter);
        }
        if (level) {
            filtered = filtered.filter(job => job.level === level);
        }
        if (searchTerm) {
            filtered = filtered.filter(job =>
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filtered;
    };

    const filteredJobs = getFilteredJobs(searchedJobs.length > 0 ? searchedJobs : jobs);

    return (
        <div>
            <div className='w-full flex-col md:flex-row flex flex-wrap gap-1 py-4'>
                <Search onSearch={setSearchTerm} />
                <div className='flex gap-1'>
                    <Select value={filter} onValueChange={handleFilterChange}>
                        <SelectTrigger className="w-[180px] text-base font-semibold">
                            <SelectValue placeholder="Filter by Type" />
                        </SelectTrigger>
                        <SelectContent className='text-base font-semibold'>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="REMOTE">Remote</SelectItem>
                            <SelectItem value="ONSITE">Onsite</SelectItem>
                            <SelectItem value="HYBRID">Hybrid</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={level} onValueChange={handleLevelChange}>
                        <SelectTrigger className="w-[180px] text-base font-semibold">
                            <SelectValue placeholder="Filter by Level" />
                        </SelectTrigger>
                        <SelectContent className='text-base font-semibold'>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="ENTRY">Entry</SelectItem>
                            <SelectItem value="JUNIOR">Entry</SelectItem>
                            <SelectItem value="MID">Mid</SelectItem>
                            <SelectItem value="SENIOR">Senior</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>



            {filteredJobs.length > 0
                ? (
                    <>
                        <h1 className='text-xl font-bold'>{filteredJobs.length} jobs found</h1>
                        {filteredJobs.map((job) => (
                            <JobCard key={job.id} item={job} />
                        ))}
                    </>
                )
                : (
                    <div className="mt-4 text-center text-gray-600">
                        No jobs available.
                    </div>
                )
            }
        </div>
    );
};

export default JobSection;
