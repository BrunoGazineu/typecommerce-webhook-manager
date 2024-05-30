import { DeadLetter } from "../entities/dead-letter.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { DeadLetterModel } from "../models/dead-letter.model";
import { Injectable } from "@nestjs/common";
import { IGateway } from "./gateway-interface";

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
    async findById(id: string): Promise<DeadLetter> {
        const deadLetter = await this.deadLetterModel.findById(id);
        if (!deadLetter)
            throw new Error("No Dead Letter was found with id: " + id);

        return this.modelToEntity(deadLetter);
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await this.deadLetterModel.deleteOne({_id: id});
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
    private modelToEntity(model: DeadLetterModel & { _id: Types.ObjectId }) {
        return new DeadLetter(model._id.toString(), model.event, model.created, model.error);
    }
}