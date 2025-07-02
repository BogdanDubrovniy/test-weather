import { IsString, IsNotEmpty } from 'class-validator';

export class GetCandlestickDto {
    @IsString()
    @IsNotEmpty()
    // todo add validator by id (entity exist)
    id!: string;
}
