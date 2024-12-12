import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { DataSource } from "typeorm";
import { AppDataSource } from "../database/data_source";
import { checkDatabase, createDatabase } from "typeorm-extension";

declare module "fastify" {
    interface FastifyInstance {
        db: DataSource;
    }
}

async function configPlugin(fastify: FastifyInstance) {
    await AppDataSource.initialize();

    fastify.decorate("db", AppDataSource);

    fastify.addHook("onClose", async (server) => {
        await server.db.destroy();
    });
}

const typeormPlugin = fp(configPlugin);

export { typeormPlugin };
