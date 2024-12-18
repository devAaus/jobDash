import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum Location {
    REMOTE = 'REMOTE',
    ONSITE = 'ONSITE',
    HYBRID = 'HYBRID',
}

export enum JobLevel {
    ENTRY = 'ENTRY',
    JUNIOR = 'JUNIOR',
    MID = 'MID',
    SENIOR = 'SENIOR',
}

export class CreateJobDto {
    @ApiProperty({
        description: 'Job title',
        example: 'Software Engineer',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Job description',
        example: 'We are looking for a Software Engineer to join our team...',
    })
    @IsString()
    desc: string;

    @ApiProperty({
        description: 'Company name',
        example: 'TechCorp',
    })
    @IsString()
    compName: string;

    @ApiProperty({
        description: 'Company address',
        example: '123 Main St, Anytown, USA',
    })
    @IsString()
    compAddress: string;

    @ApiProperty({
        description: 'Job location',
        enum: Location,
        example: Location.REMOTE,
    })
    @IsEnum(Location)
    location: Location;

    @ApiProperty({
        description: 'Job level',
        enum: JobLevel,
        example: JobLevel.ENTRY,
    })
    @IsEnum(JobLevel)
    level: JobLevel;

    @ApiProperty({
        description: 'Job experience',
        example: '5+ years of experience',
    })
    @IsString()
    experience: string;

    @ApiProperty({
        description: 'Job skills',
        example: 'Python, JavaScript, React, Node.js',
    })
    @IsString()
    skills: string;

    @ApiProperty({
        description: 'Job salary',
        example: '$80,000 - $120,000',
    })
    @IsString()
    salary: string;

    @ApiProperty({
        description: 'Job expiry date',
        example: '2023-01-01',
    })
    @IsString()
    expiryDate: string;
}
