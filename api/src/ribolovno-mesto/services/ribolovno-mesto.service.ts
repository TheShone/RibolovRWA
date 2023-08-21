import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RibolovnoMestoEntity } from '../models/ribolovnoMesto.entity';
import { Repository } from 'typeorm';
import { RibolovnoMestoDto } from '../dto/ribolovnoMesto.dto';
import { UserService } from 'src/user/services/user.service';
import { RibolovnoMestoUpdateDto } from '../dto/ribolovnoMestoUpdate.dto';

@Injectable()
export class RibolovnoMestoService {
    constructor(
    @InjectRepository(RibolovnoMestoEntity)
    private ribolovnoMestoRepository: Repository<RibolovnoMestoEntity>,
    private userService: UserService
    ){}
    async addRibolovnoMesto(ribolovno:RibolovnoMestoDto)
    {
        const ribMesto = new RibolovnoMestoEntity()
        ribMesto.Naziv=ribolovno.Naziv
        ribMesto.TipRibe=ribolovno.TipRibe
        ribMesto.PostojanjePlatforme=ribolovno.PostojanjePlatforme
        ribMesto.Osvetljenost=ribolovno.Osvetljenost
        ribMesto.Latitude=ribolovno.Latitude
        ribMesto.Longitude=ribolovno.Longitude
        ribMesto.datumPostavljanja=ribolovno.datumPostavljanja
        ribMesto.slika=ribolovno.slika
        const user = await this.userService.getUser(ribolovno.userId)
        ribMesto.user=user
        return this.ribolovnoMestoRepository.save(ribMesto)
    }
    deleteRibolovnoMesto(id: number)
    {
        return this.ribolovnoMestoRepository.delete(id);
    }
    async updateRibolovnoMesto(ribolovno: RibolovnoMestoUpdateDto)
    {
        var ribMesto = new RibolovnoMestoEntity()
        ribMesto = await this.ribolovnoMestoRepository.findOneById(ribolovno.id)
        ribMesto.Naziv=ribolovno.Naziv
        ribMesto.Osvetljenost=ribolovno.Osvetljenost
        ribMesto.PostojanjePlatforme=ribolovno.PostojanjePlatforme
        ribMesto.TipRibe=ribolovno.TipRibe
        ribMesto.slika=ribolovno.slika
        return this.ribolovnoMestoRepository.update(ribMesto.id,ribMesto)
    }
    async getRibolovnaMesta()
    {
        return this.ribolovnoMestoRepository.createQueryBuilder('ribMesto')
        .leftJoinAndSelect('ribMesto.user', 'user')
        .orderBy('ribMesto.datumPostavljanja', 'DESC')
        .select([
          'ribMesto',
          'user.username',
          'user.slika'
        ])
        .getMany();
    }
    async getRibolovnoMesto(id: number)
    {
        return this.ribolovnoMestoRepository .createQueryBuilder('ribMesto')
        .leftJoinAndSelect('ribMesto.user', 'user')
        .where('ribMesto.id = :Id', { Id:id })
        .select([
          'ribMesto',
          'user.username',
          'user.slika'
        ])
        .getOne();
    }
    async getRibolovnaPoKorisniku(id:number)
    {
        return this.ribolovnoMestoRepository.find({
            where:{
                user:{id:id}
            }
        })
    }
}
