import { RibolovnoMestoEntity } from "src/ribolovno-mesto/models/ribolovnoMesto.entity";
import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('komentar')
export class KomentarEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Opis:string;

    @Column()
    Ocena:number;

    @Column()
    datumPostavljanja:Date;

    @ManyToOne(()=> RibolovnoMestoEntity, (ribolovnoMesto)=> ribolovnoMesto.komentari)
    ribolovnoMesto: RibolovnoMestoEntity

    @ManyToOne(() => UserEntity, (user) => user.komentari)
    user: UserEntity
}
