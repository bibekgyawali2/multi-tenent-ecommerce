import { IsString, IsNotEmpty, IsOptional, IsEmail, Matches } from "class-validator";

export class createStoreDTO {
    @IsString()
    @IsNotEmpty()
    storeName: string;

    @IsString()
    @IsNotEmpty()
    businessCategory: string;

    @IsString()
    @IsNotEmpty()
    contactNumber: string;

    @IsString()
    @IsOptional()
    storeAddress?: string;

    @IsEmail()
    @IsString()
    @IsOptional()
    contactEmailAddress?: string;

    @IsString()
    @IsNotEmpty()
    name: string;


    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;


    @IsString()
    @IsNotEmpty()
    password: string;

}