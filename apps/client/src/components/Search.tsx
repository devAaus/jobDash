"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlaceholdersAndVanishInput } from './ui/placeholders-and-vanish-input';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const placeholders = [
        "Software Engineer",
        "UI/UX Designer",
        "Data Scientist",
        "DevOps Engineer",
        "Full Stack Developer",
        "Flutter Developer",
    ];

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/search-results?title=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <div className='w-full px-6 md:px-2'>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default Search;
