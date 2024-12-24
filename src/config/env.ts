import { Environment } from "../constants/environment";
import dotenv from "dotenv";
dotenv.config();

class Env {
  static NODE_ENV = process.env.NODE_ENVIRONMENT || Environment.Development;
  static PORT = +process.env.PORT! || 3000;

  // *Server Information
  static BASE_URL = process.env.BASE_URL! || "http://localhost:3000";
  static BASE_DOMAIN = process.env.BASE_DOMAIN! || "localhost";
  // *Database Configurations
  static DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
  static DATABASE_PORT = +process.env.DATABASE_PORT! || 5432;
  static DATABASE_USERNAME = process.env.DATABASE_USERNAME || "postgres";
  static DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "postgres";
  static DATABASE_NAME = process.env.DATABASE_NAME || "ecommerce";

  // *Redis Configurations
  static REDIS_PORT = process.env.REDIS_PORT!;
  static REDIS_HOST = process.env.REDIS_HOST!;
  static REDIS_PASSWORD = process.env.REDIS_PASSWORD!;


  // *Other Configurations
  static DEBUG_MODE = Boolean(process.env.DEBUG_MODE);
  static JWT_SECRET = process.env.JWT_SECRET! || 'secret';
  static TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN! || '1d';

}

export default Env;
