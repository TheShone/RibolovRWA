import { RibolovnoMestoModel } from "./ribolovnoMesto.module";
import { UserModel } from "./user.module";

export interface Komentar {
    //id:string,
    Opis:string,
    Ocena:number,
    datumPostavljanja: Date,
    user:UserModel,
    ribolovnoMesto:RibolovnoMestoModel
}
export class KomentarModel implements Komentar
{
    //id: string;
    Opis: string;
    Ocena: number;
    datumPostavljanja: Date;
    user: UserModel;
    ribolovnoMesto: RibolovnoMestoModel;

    constructor(
        //Id: string,
        Opis: string,
        Ocena: number,
        DatumPostavljanja: Date,
        User: UserModel,
        RibolovnoMesto: RibolovnoMestoModel
    ) {
        //this.id = Id;
        this.Opis = Opis;
        this.Ocena = Ocena;
        this.datumPostavljanja = DatumPostavljanja;
        this.user = User;
        this.ribolovnoMesto = RibolovnoMesto;
    }

}