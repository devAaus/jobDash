import { IsOptional, IsString } from "class-validator";

export class CreateCandidateDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    skills: string;

    @IsString()
    experience: string;

    @IsString()
    education: string;

    @IsOptional()
    @IsString()
    portfolio: string;

    @IsOptional()
    @IsString()
    github: string;
}
