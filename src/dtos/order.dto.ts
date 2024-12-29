import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";

class OrderItemDTO {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    quantity: number;
}

export class CreateOrderDTO {

    @IsNotEmpty()
    @IsString()
    storeId: string;

    @IsString()
    @IsNotEmpty()
    orderDate: string;

    @IsString()
    @IsNotEmpty()
    customerName: string;

    @IsString()
    @IsNotEmpty()
    customerEmail: string;

    @IsString()
    @IsNotEmpty()
    customerPhone: string;

    @IsString()
    @IsNotEmpty()
    shippingAddress: string;

    @IsString()
    @IsNotEmpty()
    shippingCity: string;

    @IsString()
    @IsOptional()
    shippingRegion: string;

    @IsString()
    @IsNotEmpty()
    shippingCountry: string;

    @IsString()
    @IsOptional()
    shippingPostalCode: string;

    @IsString()
    @IsNotEmpty()
    paymentMethod: string;

    @IsString()
    @IsNotEmpty()
    paymentStatus: string;

    @IsString()
    @IsOptional()
    paymentDate: string;

    @IsNumber()
    @IsOptional()
    paymentAmount: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    orderItems: OrderItemDTO[];
}