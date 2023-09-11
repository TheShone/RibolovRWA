import { KomentarEntity } from "src/komentar/entities/komentar.entity";
import { RibolovnoMestoEntity } from "src/ribolovno-mesto/models/ribolovnoMesto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { isString } from "util";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    ime:string;

    @Column()
    prezime:string;

    @Column()
    username:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    role:string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    datumRodjenja:Date;
    
    @Column()
    slika:string;

    @OneToMany(()=> RibolovnoMestoEntity, (ribMesto)=>ribMesto.user, { cascade: true })
        ribolovnaMesta: RibolovnoMestoEntity
    @OneToMany(()=> KomentarEntity, (komentar)=> komentar.user, { cascade: true })
        komentari: KomentarEntity
}
export class LoginDto{
    username:string;
    password:string;
}