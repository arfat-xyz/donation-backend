import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

const config = {
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  env: process.env.NODE_ENV,
  bycrypt_saltrounds: process.env.SALTROUNDS,
  jwt_secret: process.env.SECRET,
  jwt_expire: process.env.EXPIRE,
};
export default config;
