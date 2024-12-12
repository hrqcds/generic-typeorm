import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { UserService } from "../context/user/services/user.service";

declare module "fastify" {
    interface FastifyInstance {
        userService: UserService;
    }
}

async function configPlugin(fastify: FastifyInstance) {
    const userService = new UserService(fastify.userRepository);

    fastify.decorate("userService", userService);
}

const servicePlugin = fp(configPlugin);

export { servicePlugin };
