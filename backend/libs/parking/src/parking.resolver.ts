import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ParkingService } from "./parking.service";

import { GqlAuthGuard } from "@vms/auth/guards/GqlAuthGuard.guard";

import { Parking } from "./models/parking.model";
import { ParkingReservation } from "./models/reservation.model";

@Resolver((of) => Parking)
export class ParkingResolver {
    constructor(
        private parkingService: ParkingService,
    ) {}

    //QUERIES

    @UseGuards(GqlAuthGuard)
    @Query((returns) => String, { name: "helloParking" })
    async hello() {
        return "👋 from Parking";  
    }

    @UseGuards(GqlAuthGuard)
    @Query((returns) => Parking, { name: "getAvailableParking" })
    async getAvailableParking() {
        return this.parkingService.getAvailableParking(); 
    }

    @UseGuards(GqlAuthGuard)
    @Query((returns) => Parking, { name: "getFreeParking" })
    async getFreeParking(
    ) {
        return this.parkingService.getFreeParking();
    }

    @UseGuards(GqlAuthGuard)
    @Query((returns) => ParkingReservation, { name: "getReservations" })
    async getReservations(
    ) {
        return this.parkingService.getReservations();
    }

    //MUTATION

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => Parking, { name: "assignParking" })
    async assignParking(
        @Args("invitationID") invitationID: string,
    ) {
        return this.parkingService.assignParking(invitationID);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ParkingReservation, { name: "reserveParkingSpace" })
    async reserveParkingSpace(
        @Args("invitationID") invitationID: string,
        @Args("parkingNumber") parkingNumber: number,
    ) {
        return this.parkingService.reserveParkingSpace(parkingNumber,invitationID);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ParkingReservation, { name: "reserveParking" })
    async reserveParking(
        @Args("invitationID") invitationID: string,
    ) {
        return this.parkingService.reserveParking(invitationID);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation()
    async unreserveParking(
        @Args("invitationID") invitationID: string,
    ) {
        return this.parkingService.unreserveParking(invitationID);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => Parking, { name: "freeParking" })
    async freeParking(
        @Args("parkingNumber") parkingNumber: number,
    ) {
        return this.parkingService.freeParking(parkingNumber);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation()
    async createNParkingSpots(
        @Args("N") N: number,
    ) {
        return this.parkingService.createNParkingSpots(N);
    }

    

}
