import { UserModel } from "./user.module";

export interface ProfilState{
    isLoading: boolean;
    profil: UserModel | null;
    error: string | null
}