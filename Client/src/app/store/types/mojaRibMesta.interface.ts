import { EntityState } from "@ngrx/entity";
import { RibolovnoMestoModel } from "./ribolovnoMesto.module";

export interface MojaRibolovnaMestaState extends EntityState<RibolovnoMestoModel>{
    isLoading:boolean;
    error:string|null;
}