"use client";

import React, { useState } from 'react';
import { Input } from './ui/input';

interface SearchProps {
    onSearch: (searchTerm: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(searchTerm.trim());
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center">
            <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs..."
                className="border rounded-2xl px-6 text-base font-semibold md:w-[500px]"
            />
        </form>
    );
};

export default Search;
