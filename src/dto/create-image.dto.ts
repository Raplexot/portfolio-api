import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator'
export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
    name: string

  @IsString()
  @IsOptional()
    description?: string

  @IsString()
  @IsNotEmpty()
    imageUrl: string

  @IsNotEmpty()
    portfolioId: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
    comments?: Array<string>

  @IsOptional()
    userId?: string
}
