import * as dotenv from "dotenv";
dotenv.config();

const { DB_URI, PORT, JWT_SECRET } = process.env;

export { DB_URI, PORT, JWT_SECRET };
