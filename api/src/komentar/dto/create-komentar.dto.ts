export class CreateKomentarDto {
    Opis: string;
    Ocena: number;
    idRibolovnogMesta: number;
    idUsera: number;
    constructor(
        Opis: string,
        Ocena: number,
        idRibolovnogMesta: number,
        idUsera: number
    ){
        this.Ocena=Ocena;
        this.Opis=Opis;
        this.idRibolovnogMesta=idRibolovnogMesta;
        this.idUsera=idUsera;
    }
}
