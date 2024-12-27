import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID } from "class-validator";

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsString()
    @IsOptional()
    productDescription?: string;

    @IsString()
    @IsNotEmpty()
    productImage: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsOptional()
    crossedPrice?: number;

    @IsNumber()
    @IsNotEmpty()
    productStock: number;

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
