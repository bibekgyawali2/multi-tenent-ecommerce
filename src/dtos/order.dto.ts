import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested, IsNumber, isUUID, IsUUID } from "class-validator";
import { Type } from "class-transformer";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

class OrderItemDTO {
    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    quantity: number;
}

export class CreateOrderDTO {


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
