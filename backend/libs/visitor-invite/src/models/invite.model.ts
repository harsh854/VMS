import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Invite {
    @Field((type) => {return String})
    userEmail: string;

    @Field((type) => {return String})
    visitorEmail: string;

    @Field((type) => {return String})
    visitorName: string;

    @Field((type) => {return String})
    idDocType: string;

    @Field((type) => {return String})
    idNumber: string;

    @Field((type) => {return String})
    inviteID: string;

    @Field((type) => {return String})
    inviteDate: string;

    @Field((type) => {return Boolean})
    requiresParking: boolean;

    @Field((type) => {return String})
    inviteState: string

    @Field((type) => {return String})
    notes?: string;

    @Field((type)=> {return String},{nullable: true})
    signOutTime?: Date;

    @Field((type)=> {return String},{nullable:true})
    signInTime: string;

    @Field((type)=> {return Number})
    trayNumber?: number;

}
