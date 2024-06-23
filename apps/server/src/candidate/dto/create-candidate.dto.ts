import { IsString } from "class-validator";

export class CreateCandidateDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsString()
    skills: string;

    @IsString()
    experience: string;

    @IsString()
    education: string;

    @IsString()
    website: string;
}
