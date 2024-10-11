import { config } from 'dotenv';
config({ path: '.env' });

import { z } from 'zod';
import { IEnvs } from '../common/interfaces/envs.inteface';

const envsSchema = z
  .object({
    // DATABASE
    DB_HOST: z.string(),
    DB_PORT: z
      .string()
      .transform((port) => +port)
      .refine((val) => !isNaN(val), {
        message: 'Port must be a valid number',
      }),

    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),

    DB_NAME: z.string(),

    // JWT
    JWT_SECRET: z.string(),
    JWT_EXPIRES: z
      .string()
      .transform((value) => +value)
      .refine((val) => !isNaN(val), {
        message: 'jwt expires must be a valid number',
      }),
  })
  .transform((data) => data as IEnvs);

const { data: envs, error } = envsSchema.safeParse(process.env);

if (error) {
  const { errors } = error;

  let errMessage = [];
  errors.forEach((err) => {
    errMessage.push(`${err.path[0]}: ${err.message.toLowerCase()}`);
  });

  throw new Error(`Config validation failed: ${errMessage.join(', ')}`);
}

export { envs };
