import { IsString, IsUrl } from "class-validator";

export class CreateRecruiterDto {
    @IsString()
    name: string

    @IsString()
    email: string

    @IsString()
    location: string

    @IsString()
    description: string

    @IsUrl()
    website: string
}
