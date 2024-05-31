import { Injectable, Logger } from "@nestjs/common";
import { Attributes, IRepository } from "./repository-interface";
import { WebhookNotFoundException } from "../../webhooks/exceptions/webhook-not-found-exception";

@Injectable()
export class RepositoryInMemory<T> implements IRepository<T> {
    async count(where?: Attributes): Promise<number> {
        return this.items.filter((item) => Object.entries(where).map(([attribute, value])=>item[attribute] == value).every(v=>Boolean(v))).length
    }
    items: T[] = []

    async findAll(where = {}): Promise<T[]> {
        return this.items;
    }
    async findById(id: number): Promise<T> {
        const item = this.items.find((item: any)=> item.id === id)
        if (!item)
            throw new WebhookNotFoundException(console as any, id);

        return item;
    }
    async create(data: Partial<T>): Promise<T> {
        (data as any).id = this.items.length + 1;
        this.items.push(data as T);
        return data as T
    }
    async createMany(data: Partial<T>[]): Promise<boolean> {
        data.forEach((data: any) => {
            data.id = this.items.length + 1;
            this.items.push(data);
        })
        return true;
    }
    async update(id: number, data: Partial<T>): Promise<T> {
        const item = await this.findById(id);
        Object.assign(item, data);
        return item;
    }
    async delete(id: number): Promise<boolean> {
        const index = this.items.findIndex((item: any) => item.id === id);
        if (index === -1)
            throw new WebhookNotFoundException(console as any, id);

        this.items.splice(index, 1);
        return true;
    }
}