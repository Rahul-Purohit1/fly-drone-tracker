import { DroneModule } from "./drone/drone.module";
import { FlightLogModule } from "./flightlog/flightlog.module";
import { MissionModule } from "./mission/mission.module";
import { UserModule } from "./user/user.module";

export const AllModules = [
    DroneModule,
    UserModule,
    MissionModule,
    FlightLogModule
]