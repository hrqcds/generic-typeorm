import {
    DataSource,
    EntitySchema,
    FindOptionsWhere,
    Repository,
} from "typeorm";
import { EntityBase } from "../../models/base.entity";
import {
    IBaseRepository,
    IQuery,
} from "../interfaces/ibase.repository.interface";

export class BaseRepository<TEntity extends EntityBase>
    implements IBaseRepository<TEntity>
{
    private readonly repository: Repository<TEntity>;

    constructor(
        private dataSource: DataSource,
        private entity: EntitySchema<TEntity>,
    ) {
        this.repository = this.dataSource.getRepository(this.entity);
    }

    async getAll({
        take = 10,
        skip = 0,
        orderBy,
        order,
        filter,
    }: IQuery<Partial<TEntity>>): Promise<TEntity[]> {
        const qb = this.repository.createQueryBuilder();

        Object.entries(filter).forEach(([key, value]) => {
            qb.andWhere(`${key} Like  :${key}`, {
                [key]: `%${value}%`,
            });
        });

        if (orderBy && order) {
            qb.orderBy(orderBy, order);
        }

        if (take && skip) {
            qb.skip((skip - 1) * take).take(take);
        }

        return await qb.getMany();
    }

    async findById(id: number): Promise<TEntity | null> {
        return await this.repository.findOneBy({
            id,
        } as FindOptionsWhere<TEntity>);
    }

    async create(data: TEntity): Promise<TEntity> {
        const recipe = this.repository.create(data);

        return await this.repository.save(recipe);
    }

    async update(id: number, data: TEntity): Promise<TEntity> {
        const recipe = { id, ...data };

        return await this.repository.save(recipe);
    }

    async remove(id: number): Promise<TEntity> {
        const result = await this.repository.delete(id);

        return result.raw[0];
    }
}
