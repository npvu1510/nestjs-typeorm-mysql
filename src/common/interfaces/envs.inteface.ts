export interface IEnvs {
  DB_HOST: string;
  DB_PORT: number;

  DB_USERNAME: string;
  DB_PASSWORD: string;

  DB_NAME: string;

  JWT_SECRET: string;
  JWT_EXPIRES: number;
}
