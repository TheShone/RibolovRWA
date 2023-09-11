import { KomentarEntity } from "src/komentar/entities/komentar.entity";
import { UserEntity } from "src/user/models/user.entity";
import { Column, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('ribolovnoMesto')
export class RibolovnoMestoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Naziv:string;

    @Column()
    TipRibe:string;

    @Column()
    PostojanjePlatforme:boolean;

    @Column()
    Osvetljenost:boolean;
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    Latitude: number;
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    Longitude:number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    datumPostavljanja:Date;
    
    @Column()
    slika:string; 

    @ManyToOne(() => UserEntity, (user) => user.ribolovnaMesta, {onDelete: 'CASCADE'})
    user: UserEntity

    @OneToMany(()=> KomentarEntity, (komentar)=> komentar.ribolovnoMesto, { cascade: true })
        komentari: KomentarEntity
}