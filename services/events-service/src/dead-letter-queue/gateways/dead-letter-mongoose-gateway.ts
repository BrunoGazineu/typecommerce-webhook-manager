import { IGateway } from "src/shared/gateways/gateway-interface";
import { DeadLetter } from "../entities/dead-letter.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeadLetterModel } from "../models/dead-letter.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeadLetterMongooseGateway implements IGateway<DeadLetter> {
    constructor(
        @InjectModel(DeadLetterModel.name)
        private deadLetterModel: Model<DeadLetterModel>
    ) {}
    async create(model: DeadLetter): Promise<boolean> {
        const createDeadLetter = new this.deadLetterModel(model);
        await createDeadLetter.save()
        return true;
    }
    async findAll(): Promise<DeadLetter[]> {
        const deadLetters = await this.deadLetterModel.find();
        return deadLetters.map(
            deadLetter => this.modelToEntity(deadLetter)
        )
    }
    async findById(id: number): Promise<DeadLetter> {
        const deadLetter = await this.deadLetterModel.findById(id);
        return this.modelToEntity(deadLetter);
    }
    async deleteById(id: number): Promise<boolean> {
        const result = await this.deadLetterModel.deleteOne({id: id});
        if (result.deletedCount === 1)
            return true

        throw new Error("No Dead Letter was found with id: " + id);
    }
    update(model: DeadLetter): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    createMany(model: DeadLetter[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findAllByEventType(event_type: string): Promise<DeadLetter[]> {
        throw new Error("Method not implemented.");
    }
    private modelToEntity(model: DeadLetterModel) {
        return new DeadLetter(model.event, model.error);
    }
}