import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConfigService } from "@nestjs/config";
import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from "@vms/user";
import { MailService } from '@vms/mail';
import { ParkingService } from '@vms/parking';
import { VisitorInviteService } from '@vms/visitor-invite';
import { getTrayFromInviteQuery } from './queries/impl/getTrayFromInvite.query';
import { ReceptionistService } from './receptionist.service';
import { RestrictionsService } from "@vms/restrictions";
import { Tray } from './schema/tray.schema';
import { CACHE_MANAGER } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { RewardsService } from '@vms/rewards';

describe('ReceptionistService', () => {
  let service: ReceptionistService;
  let inviteService: VisitorInviteService;
 /*eslint-disable*/
  const commandBusMock = {
    execute: jest.fn((command) => {
        
    }),
  };

  const queryBusMock = {
    execute: jest.fn((query) => {
      if(query instanceof getTrayFromInviteQuery) {
        if (query.inviteID=="someArbitraryString") {
          const firstTray= new Tray();
          firstTray.trayID=0;
          firstTray.inviteID="someArbitraryString";
          firstTray.containsResidentID=true;
          firstTray.containsVisitorID=true;
  
          return firstTray;
        }
      }
    }),
  };
  /*eslint-enable*/

  const scheduleMock = {
    addCronJob: jest.fn(()=>{return {}}),
    deleteCronJob: jest.fn(()=>{return {}}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ReceptionistService,
        VisitorInviteService,
        ParkingService,
        MailService,
        ConfigService,
        UserService,
        RestrictionsService,
        RewardsService,
        {
            provide: CACHE_MANAGER,
            useValue: {
                get: () => {return 'any value'},
                set: () => {return jest.fn()},
            },
        },
        { provide: SchedulerRegistry, useValue: scheduleMock},
        {
          provide: QueryBus, useValue: queryBusMock
        },
        {
          provide: CommandBus, useValue: commandBusMock
        }],
    }).compile();

    service = module.get<ReceptionistService>(ReceptionistService);
    inviteService = module.get<VisitorInviteService>(VisitorInviteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(inviteService).toBeDefined();
  });

  describe("generateTrayID", () => {
    it("should return a valid Tray id", async () => {
      const getTray=await service.getTrayByInviteID("someArbitraryString");
      expect( getTray.trayID).toEqual(0);
    });
  });
});
