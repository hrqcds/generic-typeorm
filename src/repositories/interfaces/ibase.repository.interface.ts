import { EntityBase } from "../../models/base.entity";

export interface IQuery<T> {
    skip?: number;
    take?: number;
    order?: "ASC" | "DESC";
    orderBy?: Extract<keyof T, string>;
    filter: Partial<T>;
}

export interface IBaseRepository<TEntity extends EntityBase> {
    getAll(query: IQuery<Partial<TEntity>>): Promise<TEntity[]>;
    findById(id: number): Promise<TEntity | null>;
    create(data: TEntity): Promise<TEntity>;
    update(id: number, data: TEntity): Promise<TEntity>;
    remove(id: number): Promise<TEntity>;
}
