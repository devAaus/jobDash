
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Job } from "@/types";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

type JobType = {
    job: Job[];
    handleDelete: (id: number) => void;
};

const JobTable = ({ job, handleDelete }: JobType) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">S.N.</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {job.map((job: Job, index) => (
                    <TableRow key={job.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>

                        <TableCell className="font-bold text-base">
                            <Link href={`/jobs/${job.id}`}>
                                {job.title}
                            </Link>
                        </TableCell>

                        <TableCell>{job.compName}</TableCell>

                        <TableCell className="flex space-x-4 items-center justify-end">

                            <Link href={`/admin-dashboard/edit-jobs/${job.id}`}>
                                <FaRegEdit size={20} className="text-blue-500" />
                            </Link>

                            <MdDeleteOutline
                                size={20}
                                className="text-red-500 cursor-pointer"
                                onClick={() => handleDelete(job.id)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default JobTable;
