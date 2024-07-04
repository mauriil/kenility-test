import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  CORS_ORIGIN: get('CORS_ORIGIN').required().asString(),
  MONGO_URI: get('MONGO_URI').required().asString(),
  BASE_FRONTEND_URL: get('BASE_FRONTEND_URL').required().asString(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  JWT_EXPIRES_IN: get('JWT_EXPIRES_IN').required().asString(),
};
