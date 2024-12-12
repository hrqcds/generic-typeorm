import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { BadRequest } from "../exceptions/bad_request.exception";
import { NotFound } from "../exceptions/not_found.exception";
import { ZodError } from "zod";
import { Conflict } from "../exceptions/conflict.exception";

async function configPlugin(fastify: FastifyInstance) {
    fastify.setErrorHandler((error, req, reply) => {
        if (
            error instanceof BadRequest ||
            error instanceof NotFound ||
            error instanceof Conflict
        ) {
            reply.status(error.statusCode).send({
                status: "Error",
                message: error.message,
            });
        }

        if (error instanceof ZodError) {
            reply.status(400).send({
                status: "Error",
                message: error.errors[0].message,
            });
        }

        reply.status(500).send({
            status: "Error",
            message: "Erro interno do servidor",
        });
    });
}

const errorPlugin = fp(configPlugin);

export { errorPlugin };
