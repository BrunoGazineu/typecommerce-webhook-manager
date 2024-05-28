export interface IGateway<T> {
    create(model: T) : Promise<boolean>;
    update(model: T) : Promise<boolean>;
    createMany(model: T[]) : Promise<boolean>;
    findById(id: number) : Promise<T>;
    findAll(): Promise<T[]>;
    findAllByEventType(event_type: string) : Promise<T[]>;
    deleteById(id: number) : Promise<boolean>;
}