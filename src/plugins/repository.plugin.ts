import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { UserRepository } from "../repositories/implementations/user.repository";
import { UserSchema } from "../models/user.entity";

declare module "fastify" {
    interface FastifyInstance {
        userRepository: UserRepository;
    }
}

async function configPlugin(fastify: FastifyInstance) {
    fastify.decorate(
        "userRepository",
        new UserRepository(fastify.db, UserSchema),
    );
}

const repositoryPlugin = fp(configPlugin);

export { repositoryPlugin };
