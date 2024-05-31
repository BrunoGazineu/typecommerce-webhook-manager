export type Attributes<TAttributes = any> = {
    [AttributeName in keyof TAttributes as AttributeName extends string ? AttributeName | `$${AttributeName}$` : never]: any
}

export interface IRepository<T> {
    
    findAll(where?: Attributes): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    createMany(data: Partial<T>[]) : Promise<boolean>;
    update(id: number, data: Partial<T>): Promise<T | null>
    delete(id: number): Promise<boolean>;
    count(where?: Attributes): Promise<number>;
}   


