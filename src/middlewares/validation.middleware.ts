import { validate } from "class-validator";
import { ClassConstructor, plainToClass } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/HttpException";

const Validate = <T extends ClassConstructor<any>>(DTO: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validatorDto = async () => {
      try {
        // Convert price and stock to numbers if they're strings
        const body = { ...req.body };

        if (typeof body.price === 'string') {
          const price = parseFloat(body.price);
          if (!isNaN(price)) {
            body.price = price;
          }
        }

        if (typeof body.stock === 'string') {
          const stock = parseInt(body.stock, 10);
          if (!isNaN(stock)) {
            body.stock = stock;
          }
        }

        const objInstance = plainToClass(DTO, body);
        const errors = await validate(objInstance, { whitelist: true });

        if (errors.length) {
          const error = errors[0].constraints;
          if (error) {
            const message = Object.values(error)[0];
            throw HttpException.badRequest(message);
          }
        }

        // Update the request body with converted values
        req.body = body;
        next();
      } catch (error) {
        next(error);
      }
    };
    validatorDto();
  };
};

export default Validate;