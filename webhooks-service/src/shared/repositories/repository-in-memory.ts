import { Injectable } from "@nestjs/common";
import { IRepository } from "./repository-interface";
import { WebhookNotFoundException } from "../../webhooks/exceptions/webhook-not-found-exception";

@Injectable()
export class RepositoryInMemory<T> implements IRepository<T> {
    items: T[] = []

    async findAll(): Promise<T[]> {
        return this.items;
    }
    async findById(id: number): Promise<T> {
        const item = this.items.find((item: any)=> item.id === id)
        if (!item)
            throw new WebhookNotFoundException(id);

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
            throw new Error("O item não existe");

        this.items.splice(index, 1);
        return true;
    }
}