import { Injectable, Logger } from "@nestjs/common";
import { IGateway } from "./gateway-interface";

@Injectable()
export class RepositoryInMemory<T> implements IGateway<T> {
    items: T[] = []

    async findAll(where = {}): Promise<T[]> {
        return this.items;
    }
    async findById(id: number): Promise<T> {
        const item = this.items.find((item: any)=> item.id === id)
        if (!item)
            throw new Error("Object not found");

        return item;
    }
    async create(model: T): Promise<boolean> {
        (model as any).id = this.items.length + 1;
        this.items.push(model as T);
        return true
    }
    async createMany(data: Partial<T>[]): Promise<boolean> {
        data.forEach((data: any) => {
            data.id = this.items.length + 1;
            this.items.push(data);
        })
        return true;
    }
    async update(model: T): Promise<boolean> {
        const item = await this.findById((model as any).id);
        Object.assign(item, model);
        return true;
    }
    async deleteById(id: number): Promise<boolean> {
        const index = this.items.findIndex((item: any) => item.id === id);
        if (index === -1)
            throw new Error("Object not found");

        this.items.splice(index, 1);
        return true;
    }

    async findAllByEventType(event_type: string): Promise<T[]> {
        return this.items.filter((item: any)=>item.event_types.include(event_type))
    }
}