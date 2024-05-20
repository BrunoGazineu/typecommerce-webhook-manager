import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import { EventTypeModel } from "src/event-types/models/event-type.model";

export function IsUnique(model: any, validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            name: "isValidEventTypes",
            target: object.constructor,
            propertyName: propertyName,
            validator: {
                async validate(value: string[], args: ValidationArguments) {
                    const count = await (model as any).count({ where: {[propertyName]: value} })

                    return count === 0;
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be unique`;
                }
            }
        })
    }
}

export function IsValidEventTypes(model: typeof EventTypeModel, validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            name: "isValidEventTypes",
            target: object.constructor,
            propertyName: propertyName,
            validator: {
                async validate(value: string[], args: ValidationArguments) {
                    const existingEventTypes = await model.findAll({ where: {name: value} })
                    if (existingEventTypes.length !== value.length)
                        return false;

                    return true;
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} has invalid event types`;
                }
            }
        })
    }
}