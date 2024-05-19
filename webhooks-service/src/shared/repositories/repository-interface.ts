export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    createMany(data: Partial<T>[]) : Promise<boolean>;
    update(id: number, data: Partial<T>): Promise<T | null>
    delete(id: number): Promise<boolean>;
}