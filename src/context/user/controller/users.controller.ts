import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user.service";
import { CreateUserType, QueryUserType, UpdateUserType } from "../zod/user.zod";

class UserController {
    constructor(private userService: UserService) {}

    async findById(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: number };

        const response = await this.userService.findById(id);

        reply.send(response);
    }

    async getAll(req: FastifyRequest, reply: FastifyReply) {
        const query = req.query as QueryUserType;

        reply.send(await this.userService.getAll(query));
    }

    async create(req: FastifyRequest, reply: FastifyReply) {
        const data = req.body as CreateUserType;

        const response = await this.userService.create(data);

        reply.code(201);

        reply.send(response);
    }

    async update(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: number };

        const data = req.body as UpdateUserType;

        const response = await this.userService.update(id, data);

        reply.send(response);
    }

    async remove(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: number };

        const response = await this.userService.remove(id);

        reply.send(response);
    }
}

export { UserController };
