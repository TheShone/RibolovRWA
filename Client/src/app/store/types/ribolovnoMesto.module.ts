import { UserModel } from "./user.module";

export interface RibolovnoMesto{
    id:number;
    Naziv: string;
    TipRibe: string;
    PostojanjePlatforme: boolean;
    Osvetljenost: boolean;
    Latitude: number;
    Longitude: number;
    datumPostavljanja: Date;
    slika: string;
    user: UserModel;
}
export class RibolovnoMestoModel implements RibolovnoMesto {
    constructor(
        public id:number,
        public Naziv: string,
        public TipRibe: string,
        public PostojanjePlatforme: boolean,
        public Osvetljenost: boolean,
        public Latitude: number,
        public Longitude: number,
        public datumPostavljanja: Date,
        public slika: string,
        public user: UserModel
    ) {}
}
export class RibolovnoMestoModelAdd {
    constructor(
        public Naziv: string,
        public TipRibe: string,
        public PostojanjePlatforme: boolean,
        public Osvetljenost: boolean,
        public Latitude: number,
        public Longitude: number,
        public datumPostavljanja: Date,
        public slika: string,
        public user: UserModel
    ) {}
}