import { IResult } from "../../../utils/result.interface";
import { QueryUserType } from "../zod/user.zod";

interface iUserServiceDTO<Result> {
    create(data: Partial<Result>): Promise<IResult<Result>>;
    update(id: number, data: Partial<Result>): Promise<IResult<Result>>;
    getAll(query: QueryUserType): Promise<IResult<Result[]>>;
    findById(id: number): Promise<IResult<Result>>;
    remove(id: number): Promise<IResult<Result>>;
    findByEmail(email: string): Promise<IResult<Result>>;
}

export { iUserServiceDTO };
