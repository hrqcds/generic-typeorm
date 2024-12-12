import { BaseRepository } from "./base.repository";
import { User } from "../../models/user.entity";
import { IUserRepository } from "../interfaces/iuser.repository.interface";
import { DataSource, EntitySchema, Repository } from "typeorm";

class UserRepository extends BaseRepository<User> implements IUserRepository {
    private readonly _repository: Repository<User>;

    constructor(dataSource: DataSource, entity: EntitySchema<User>) {
        super(dataSource, entity);
        this._repository = dataSource.getRepository(entity);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this._repository.findOneBy({
            email,
        });
    }
}

export { UserRepository };
