import { EntityState } from "@ngrx/entity";
import { UserModel } from "./user.module";

export interface UseriState extends EntityState<UserModel>{
    isLoading:boolean;
    error: string | null;
}