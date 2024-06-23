


import axios from "axios";

const api = process.env.NEXT_PUBLIC_AUTH_URL

export const getJob = async () => {
    const res = await axios.get(`${api}/api/job`)
    return res.data
}


export const getJobById = async (id: number) => {
    const res = await axios.get(`${api}/api/job/${id}`)
    return res.data
}


export const updateJob = async (id: number, formData: FormData, accessToken: string) => {
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/job/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return res;
}

export const deleteJob = async (id: number, accessToken: string) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/job/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return res;
}