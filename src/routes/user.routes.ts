import { FastifyInstance } from "fastify";
import { AuthenticationMiddleware } from "../middlewares/authentication.middleware";

async function UserRoutes(fastify: FastifyInstance) {
    fastify.addHook("preHandler", AuthenticationMiddleware);
    fastify.get("/users", fastify.userController.getAll);
    fastify.get("/users/:id", fastify.userController.findById);
    fastify.post("/users", fastify.userController.create);
    fastify.put("/users/:id", fastify.userController.update);
    fastify.delete("/users/:id", fastify.userController.remove);
}

export { UserRoutes };
