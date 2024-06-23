import { IsEnum, IsInt, IsNumber } from "class-validator";

enum SelectionStatus {
    APPLIED = 'APPLIED',
    SELECTED = 'SELECTED',
    REJECTED = 'REJECTED',
}

export class CreateSelectionDto {
    @IsEnum(SelectionStatus)
    status: SelectionStatus

    @IsInt()
    jobId: number
}
