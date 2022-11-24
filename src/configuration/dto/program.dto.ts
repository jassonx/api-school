import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class ProgramDto {
  @IsNotEmpty()
  @IsEmail()
  public name: string;

  @IsNotEmpty()
  @IsNumber()
  public user: number;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  public students?: number[];
}
