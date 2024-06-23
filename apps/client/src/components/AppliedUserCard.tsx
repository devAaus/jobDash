"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Candidate, Selection } from '@/types';
import CandidateDetails from './CandidateDetails';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type Props = {
    handleUpdate: (selectionId: number, value: string) => void;
    selection: Selection;
};

const AppliedUserCard = ({ selection, handleUpdate }: Props) => {
    const [user, setUser] = useState<Candidate | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/users/${selection.userId}`);
                setUser(res.data.candidate);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [selection.userId]);

    const handleChange = (value: string) => {
        handleUpdate(selection.id, value);
    };

    if (loading) {
        return <div className='px-1'>Loading...</div>;
    }

    return (
        <div className="card">
            {user && <CandidateDetails user={user} />}
            <Select value={selection.status} onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="APPLIED">Applied</SelectItem>
                    <SelectItem value="SELECTED">Selected</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default AppliedUserCard;
