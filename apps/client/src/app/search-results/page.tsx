"use client"

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { HoverEffect } from '@/components/ui/card-hover-effect';

const SearchResults = () => {
    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (title) {
            const fetchJobs = async () => {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/job/search/title?title=${encodeURIComponent(title as string)}`);
                    setJobs(response.data);
                } catch (error) {
                    console.error("Failed to fetch jobs:", error);
                }
            };

            fetchJobs();
        }
    }, [title]);

    return (
        <div className='w-full px-6 md:px-2'>
            <h1 className='text-2xl font-bold text-center'>Search Results for &apos;{title}&apos;</h1>
            {jobs.length > 0 ? (
                <HoverEffect items={jobs} />
            ) : (
                <p>No jobs found</p>
            )}
        </div>
    );
};

const SearchResultsPage = () => {
    return (
        <Suspense fallback={<div>Loading search results...</div>}>
            <SearchResults />
        </Suspense>
    );
};

export default SearchResultsPage;
