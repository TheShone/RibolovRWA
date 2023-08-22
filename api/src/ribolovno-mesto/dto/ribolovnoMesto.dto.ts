import { Double } from "typeorm";
import { RibolovnoMestoEntity } from "../models/ribolovnoMesto.entity";
import { isStringObject } from "util/types";

export class RibolovnoMestoDto {
    Naziv: string;
    TipRibe: string;
    PostojanjePlatforme: boolean;
    Osvetljenost: boolean;
    Latitude: number;
    Longitude: number;
    datumPostavljanja: Date;
    slika: string;
    userId: number;

    constructor(ribolovnoMesto: RibolovnoMestoEntity) {
        this.Naziv = ribolovnoMesto.Naziv;
        this.TipRibe = ribolovnoMesto.TipRibe;
        this.PostojanjePlatforme = ribolovnoMesto.PostojanjePlatforme;
        this.Osvetljenost = ribolovnoMesto.Osvetljenost;
        this.Latitude=ribolovnoMesto.Latitude;
        this.Longitude=ribolovnoMesto.Longitude;
        this.datumPostavljanja = ribolovnoMesto.datumPostavljanja;
        this.slika = ribolovnoMesto.slika;
        this.userId = ribolovnoMesto.user.id;
    }
}