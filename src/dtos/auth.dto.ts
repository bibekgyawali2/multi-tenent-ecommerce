import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";

export class SignUpDTO {
  @IsString()
  @IsNotEmpty()
  name: string;


  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;


  @IsString()
  @IsOptional()
  phone: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password is  too weak",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
