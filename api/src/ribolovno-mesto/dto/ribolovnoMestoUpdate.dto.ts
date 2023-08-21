import { Double } from "typeorm";
import { RibolovnoMestoEntity } from "../models/ribolovnoMesto.entity";

export class RibolovnoMestoUpdateDto {
    id: number;
    Naziv: string;
    TipRibe: string;
    PostojanjePlatforme: boolean;
    Osvetljenost: boolean;
    slika: string;

    constructor(ribolovnoMesto: RibolovnoMestoEntity) {
        this.id = ribolovnoMesto.id;
        this.Naziv = ribolovnoMesto.Naziv;
        this.TipRibe = ribolovnoMesto.TipRibe;
        this.PostojanjePlatforme = ribolovnoMesto.PostojanjePlatforme;
        this.Osvetljenost = ribolovnoMesto.Osvetljenost;
        this.slika = ribolovnoMesto.slika;
    }
}