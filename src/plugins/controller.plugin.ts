import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { UserController } from "../context/user/controller/users.controller";

declare module "fastify" {
    interface FastifyInstance {
        userController: UserController;
    }
}

async function configPlugin(fastify: FastifyInstance) {
    const userController = new UserController(fastify.userService);

    fastify.decorate("userController", userController);
}

const controllerPlugin = fp(configPlugin);

export { controllerPlugin };
