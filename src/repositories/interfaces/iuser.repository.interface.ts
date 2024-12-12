import { User } from "../../models/user.entity";
import { IBaseRepository } from "./ibase.repository.interface";

export interface IUserRepository extends IBaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;
}
