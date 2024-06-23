import JobdetailsSection from './JobdetailsSection';
import { getJobById } from '@/services/axios.service';

const SingleJobPage = async ({ params }: { params: { id: number } }) => {
    const { id } = params;
    const jobData = await getJobById(id);

    return (
        <JobdetailsSection data={jobData} />
    );
};

export default SingleJobPage;
