import { FastifyInstance } from "fastify";
import { IResult } from "../utils/result.interface";
import { Verify } from "../utils/hash";
import jwt from "jsonwebtoken";
import { BadRequest } from "../exceptions/bad_request.exception";

async function AuthenticateRoutes(fastify: FastifyInstance) {
    fastify.post("/auth", async (req, reply) => {
        const { password, email } = req.body as {
            email: string;
            password: string;
        };

        if (!email || !password) {
            throw new BadRequest("Registro e senha são obrigatórios");
        }

        const user = await fastify.userService.findByEmail(email);

        const verifyPassword = await Verify(user.data.password, password);

        if (!verifyPassword) {
            throw new BadRequest("Usuário ou senhas estão incorretos");
        }

        const token = jwt.sign(
            {
                email,
                name: user.data.name,
            },
            process.env.JWT_SECRET || "secret",
            {
                expiresIn: process.env.JWT_EXPIRES || "8h",
            },
        );

        reply.send({
            status: "success",
            message: "Autenticado com sucesso",
            data: {
                email,
                token,
            },
        } as IResult<{ email: string; token: string }>);
    });
}

export { AuthenticateRoutes };
