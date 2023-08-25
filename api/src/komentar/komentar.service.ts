import { UserService } from './../user/services/user.service';
import { Injectable } from '@nestjs/common';
import { CreateKomentarDto } from './dto/create-komentar.dto';
import { UpdateKomentarDto } from './dto/update-komentar.dto';
import { KomentarEntity } from './entities/komentar.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RibolovnoMestoService } from 'src/ribolovno-mesto/services/ribolovno-mesto.service';

@Injectable()
export class KomentarService {
  constructor(
    @InjectRepository(KomentarEntity)
    private komentarRepository: Repository<KomentarEntity>,
    private userService: UserService,
    private ribMestoService: RibolovnoMestoService
  ){}
  async create(createKomentarDto: CreateKomentarDto) {
    const Komentar = new KomentarEntity();
    Komentar.Opis=createKomentarDto.Opis;
    Komentar.Ocena=createKomentarDto.Ocena;
    const ribMesto = await this.ribMestoService.getRibolovnoMesto(createKomentarDto.idRibolovnogMesta);
    Komentar.ribolovnoMesto=ribMesto
    const user = await this.userService.getUser(createKomentarDto.idUsera)
    Komentar.user=user
    Komentar.datumPostavljanja=new Date()
    return this.komentarRepository.save(Komentar)
  }

  findOne(id: number) {
    return this.komentarRepository.findOneById(id);
  }

  async update(id: number, updateKomentarDto: UpdateKomentarDto) {
    const komentar: KomentarEntity = await this.findOne(id);
    komentar.Opis=updateKomentarDto.Opis;
    komentar.Ocena=updateKomentarDto.Ocena
    return this.komentarRepository.update(komentar.id,komentar)
  }

  removeKomentar(id: number) {
    this.komentarRepository.delete(id);
    return id;
  }
  getKomentareZaRibolovnoMesto(id:number){
    return this.komentarRepository.createQueryBuilder('komentar')
    .leftJoinAndSelect('komentar.user','user')
    .where('komentar.ribolovnoMesto.id=:id',{id:id})
    .orderBy('komentar.datumPostavljanja','DESC')
    .select([
      'komentar',
      'user.username',
      'user.slika'
    ])
    .getMany();
  }
}
