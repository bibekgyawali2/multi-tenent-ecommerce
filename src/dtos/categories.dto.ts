import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class createCategoryDTO {
    @IsString()
    @IsNotEmpty()
    categoryName: string;

    @IsString()
    @IsOptional()
    categoryDescription?: string;

    @IsString()
    @IsOptional()
    categoryImage?: string;
}