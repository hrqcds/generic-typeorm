import { DataSource } from "typeorm";
import { User } from "../models/user.entity";

export const AppDataSource = new DataSource({
    entities: [User],
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
});
