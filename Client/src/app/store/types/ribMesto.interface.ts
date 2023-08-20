import { RibolovnoMestoModel } from "./ribolovnoMesto.module";

export interface RibolovnoMestoState{
    isLoading: boolean;
    ribolovnoMesto: RibolovnoMestoModel | null;
    error: string | null;
}