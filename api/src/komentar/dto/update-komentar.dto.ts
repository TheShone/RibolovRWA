import { PartialType } from '@nestjs/mapped-types';
import { CreateKomentarDto } from './create-komentar.dto';

export class UpdateKomentarDto extends PartialType(CreateKomentarDto) {
    Opis: string;
    Ocena: number;

    constructor(
        Opis: string,
        Ocena: number
    ) {
        super(); 
        this.Opis = Opis;
        this.Ocena = Ocena;
    }
}
