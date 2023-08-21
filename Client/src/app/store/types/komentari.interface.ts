import { EntityState } from "@ngrx/entity";
import { KomentarModel } from "./komentar.module";

export interface KomentariState extends EntityState<KomentarModel>{
    isLoadingg:boolean;
    errorr: string | null;
}