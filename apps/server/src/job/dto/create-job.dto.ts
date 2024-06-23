import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

enum Location {
    REMOTE = 'REMOTE',
    ONSITE = 'ONSITE',
    HYBRID = 'HYBRID',
}

enum JobLevel {
    ENTRY = 'ENTRY',
    JUNIOR = 'JUNIOR',
    MID = 'MID',
    SENIOR = 'SENIOR',
}

export class CreateJobDto {
    @IsString()
    title: string;

    @IsString()
    desc: string;

    @IsString()
    compName: string;

    @IsString()
    compAddress: string;

    @IsEnum(Location)
    location: Location;

    @IsEnum(JobLevel)
    level: JobLevel;

    @IsString()
    experience: string;

    @IsString()
    skills: string;

    @IsString()
    salary: string;

    @IsString()
    expiryDate: string;
}
