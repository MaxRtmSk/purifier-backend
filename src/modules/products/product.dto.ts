import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    characteristics: string;

    @IsString()
    @IsNotEmpty()
    points: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    brandId: number;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @IsNumber()
    @IsNotEmpty()
    subCategoryId: number;

    @IsOptional()
    images?: string[];
}