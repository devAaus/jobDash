import { IsEnum, IsInt, IsNumber, IsString } from "class-validator";

enum SelectionStatus {
    APPLIED = 'APPLIED',
    SELECTED = 'SELECTED',
    REJECTED = 'REJECTED',
}

export class CreateSelectionDto {
    @IsEnum(SelectionStatus)
    status: SelectionStatus

    @IsString()
    jobId: string
}
