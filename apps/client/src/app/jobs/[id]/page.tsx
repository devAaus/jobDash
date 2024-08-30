import JobdetailsSection from './JobdetailsSection';
import { getJobById } from '@/services/axios.service';

const SingleJobPage = async ({ params }: { params: { id: number } }) => {
    const { id } = params;
    const jobData = await getJobById(id);

    return (
        <>
            {jobData
                ? <JobdetailsSection data={jobData} />
                : <div>Job has been expired or detail not found</div>
            }
        </>
    );
};

export default SingleJobPage;
