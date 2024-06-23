export type Job = {
    id: number;
    title: string;
    desc: string;
    compName: string;
    compAddress: string;
    location: string;
    experience: string;
    level: string;
    skills: string;
    salary: string;
    expiryDate: string;
};

export type FormData = {
    title: string
    desc: string
    compName: string
    compAddress: string
    location: string
    level: string
    experience: string
    skills: string;
    salary: string;
    expiryDate: string;
}

export type AuthData = {
    accessToken: string,
    refreshToken: string,
    role: string,
}

export type Recruiter = {
    id: number
    name: string
    email: string
    location: string
    description: string
    website: string
}

export type RecruiterFormData = {
    name: string
    email: string
    location: string
    description: string
    website: string
}

export type Candidate = {
    id: number
    firstName: string
    lastName: string
    email: string
    skills: string
    experience: string
    education: string
    website: string
}

export type CandidateFormData = {
    firstName: string
    lastName: string
    email: string
    skills: string
    experience: string
    education: string
    website: string
}

export interface Selection {
    id: number;
    userId: number;
    jobId: number;
    status: string;
}
