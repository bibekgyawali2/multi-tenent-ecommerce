import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID } from "class-validator";

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsString()
    @IsOptional()
    description!: string;


    productImage?: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    price: number;

    @IsNumber()
    @IsOptional()
    crossedPrice?: number;

    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    product_sku?: string;

    @IsUUID()
    @IsOptional()
    categoryId: string;

}
