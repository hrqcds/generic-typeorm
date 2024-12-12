/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import jwt from "jsonwebtoken";
import { IResult } from "../utils/result.interface";
import { Unauthorized } from "../exceptions/Unauthorized.exception";

function AuthenticationMiddleware(
    req: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction,
) {
    const token = req.headers["authorization"];

    if (!token) {
        throw new Unauthorized("Usuário não autorizado");
    }

    const bearerToken = token?.split(" ")[1];

    try {
        jwt.verify(bearerToken!, process.env.JWT_SECRET || "secret");
        done();
    } catch (error) {
        throw new Unauthorized("Usuário não autorizado");
    }
}

export { AuthenticationMiddleware };
