import { EntityState } from "@ngrx/entity";
import { User, UserModel } from "./user.module";
import { RibolovnoMestoModel } from "./ribolovnoMesto.module";

export interface RibolovnaMestaState extends EntityState<RibolovnoMestoModel>{
    isLoading:boolean;
    error: string | null;
}