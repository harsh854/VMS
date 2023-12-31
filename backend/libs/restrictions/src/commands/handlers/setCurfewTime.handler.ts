import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Restriction, RestrictionDocument } from "../../schema/restriction.schema";
import { SetCurfewTimeCommand } from "../impl/setCurfewTime.command";
//curfew time wherafter the invites are extended
@CommandHandler(SetCurfewTimeCommand)
export class SetCurfewTimeHandler implements ICommandHandler {
    constructor(
        @InjectModel(Restriction.name) private restrictionModel: Model<RestrictionDocument>,
    ) {
    }

    async execute(command: SetCurfewTimeCommand) {
        const { curfewTime } = command;
        return await this.restrictionModel.findOneAndUpdate({ name: "curfewTime" }, { value: curfewTime })
    }
}
