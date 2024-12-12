import { z } from "zod";

const CreateUserZod = z.object({
    name: z.string({
        required_error: "Nome é obrigatório",
        invalid_type_error: "Nome deve ser do tipo string",
    }),
    email: z
        .string({
            required_error: "Registro é obrigatório",
            invalid_type_error: "Registro deve ser do tipo string",
        })
        .min(4, "No minimo 4 caracteres")
        .max(16, "No máximo 16 caracteres"),
    password: z
        .string({
            required_error: "Senha é obrigatória",
            invalid_type_error: "Senha deve ser do tipo string",
        })
        .min(6, "No minimo 6 caracteres")
        .max(16, "No máximo 16 caracteres"),
});

const UpdateUserZod = z.object({
    name: z
        .string({
            invalid_type_error: "Nome deve ser do tipo string",
        })
        .optional(),
    email: z
        .string({
            invalid_type_error: "Registro deve ser do tipo string",
        })
        .min(4, "No minimo 4 caracteres")
        .max(16, "No máximo 16 caracteres")
        .optional(),
    password: z
        .string({
            invalid_type_error: "Senha deve ser do tipo string",
        })
        .min(6, "No minimo 6 caracteres")
        .max(16, "No máximo 16 caracteres")
        .optional(),
});

const QueryUserZod = z.object({
    name: z
        .string({
            invalid_type_error: "Nome deve ser do tipo string",
        })
        .optional(),
    email: z
        .string({
            invalid_type_error: "Email deve ser do tipo string",
        })
        .min(4, "No minimo 4 caracteres")
        .max(16, "No máximo 16 caracteres")
        .optional(),
});

type CreateUserType = z.infer<typeof CreateUserZod>;
type UpdateUserType = z.infer<typeof UpdateUserZod>;
type QueryUserType = z.infer<typeof QueryUserZod>;

export {
    CreateUserZod,
    UpdateUserZod,
    QueryUserZod,
    CreateUserType,
    UpdateUserType,
    QueryUserType,
};
