import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Cities, City } from '../types';

export class GetCandlestickDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(Cities)
    city!: City;
}
