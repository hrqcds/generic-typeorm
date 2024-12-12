import { iUserServiceDTO } from "../dtos/user.dto";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import { BadRequest } from "../../../exceptions/bad_request.exception";
import { IResult } from "../../../utils/result.interface";
import { NotFound } from "../../../exceptions/not_found.exception";
import { Conflict } from "../../../exceptions/conflict.exception";
import { Hash } from "../../../utils/hash";
import {
    CreateUserType,
    UpdateUserType,
    QueryUserType,
    CreateUserZod,
    UpdateUserZod,
} from "../zod/user.zod";
import { SameDate } from "../../../utils/date";
import { User } from "../../../models/user.entity";

class UserService implements iUserServiceDTO<User> {
    constructor(private userRepository: UserRepository) {}

    async findById(id: number): Promise<IResult<User>> {
        if (!id) {
            throw new BadRequest("Id é obrigatório");
        }

        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFound("Usuário não foi encontrado");
        }

        return {
            status: "success",
            message: `Usuário de ID: ${id} encontrado com sucesso`,
            data: user,
        };
    }

    async findByEmail(email: string): Promise<IResult<User>> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new NotFound("Usuário não encontrado");
        }

        return {
            status: "success",
            message: "teste",
            data: user,
        };
    }

    async getAll(query: QueryUserType): Promise<IResult<User[]>> {
        if (!query.name) {
            query.name = "";
        }

        if (!query.email) {
            query.email = "";
        }

        const users = await this.userRepository.getAll({
            filter: { ...query },
        });

        return {
            status: "success",
            message: "Busca de usuários com sucesso",
            data: users ?? [],
        };
    }

    async create(data: CreateUserType): Promise<IResult<User>> {
        const validate = await CreateUserZod.safeParseAsync(data);

        if (!validate.success) {
            throw new BadRequest(validate.error.message);
        }

        const verifyRegisterValid = await this.userRepository.findByEmail(
            data.email,
        );

        if (verifyRegisterValid) {
            throw new Conflict("Este registro está em uso por outro usuário");
        }

        const { value, status } = await Hash(data.password);

        if (!status) {
            throw new BadRequest("Error ao verificar as senha");
        }

        const user = await this.userRepository.create({
            ...data,
            password: value!,
        });

        return {
            status: "success",
            message: "Usuário criado com sucesso",
            data: user,
        };
    }

    async update(id: number, data: UpdateUserType): Promise<IResult<User>> {
        if (!id) {
            throw new BadRequest("Id é obrigatório");
        }

        const userExist = await this.userRepository.findById(id);

        if (!userExist) {
            throw new NotFound("Usuário não foi encontrado");
        }

        if (!data.name && !data.email) {
            return {
                status: "success",
                message: "Usuário atualizado com uscesso",
                data: userExist,
            };
        }

        const validate = await UpdateUserZod.safeParseAsync(data);

        if (!validate.success) {
            throw new BadRequest(validate.error.message);
        }

        if (data.email) {
            const userEmailFound = await this.userRepository.findByEmail(
                data.email,
            );

            if (userEmailFound) {
                if (
                    !SameDate(userExist.createdAt!, userEmailFound.createdAt!)
                ) {
                    throw new Conflict(
                        "Este registro está em uso por outro usuário",
                    );
                }
            }
        }

        if (data.password) {
            const hash = await Hash(data.password);

            if (hash.status) {
                data.password = hash.value!;
            } else {
                throw new BadRequest(
                    "Erro ao manipular senha, tente novamente",
                );
            }
        }

        console.log("antes do T");

        const t = {
            ...userExist,
            ...Object.entries(data).reduce((acc, [key, value]) => {
                if (value) {
                    return { ...acc, [key]: value };
                }

                return acc;
            }, {} as User),
        };

        const userUpdated = await this.userRepository.update(id, t);

        return {
            status: "success",
            message: "Usuário atualizado com sucesso",
            data: userUpdated,
        };
    }

    async remove(id: number): Promise<IResult<User>> {
        if (!id) {
            throw new BadRequest("Id é obrigatório");
        }

        const userExist = await this.userRepository.findById(id);

        if (!userExist) {
            throw new NotFound("Usuário não foi encontrado");
        }

        const userDeleted = await this.userRepository.remove(id);

        return {
            status: "success",
            message: "Usuário deletado com sucesso",
            data: userDeleted,
        };
    }
}

export { UserService };
