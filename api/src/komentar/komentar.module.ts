import { Module } from '@nestjs/common';
import { KomentarService } from './komentar.service';
import { KomentarController } from './komentar.controller';
import { KomentarEntity } from './entities/komentar.entity';
import { UserModule } from 'src/user/user.module';
import { RibolovnoMestoModule } from 'src/ribolovno-mesto/ribolovno-mesto.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([KomentarEntity]), UserModule, RibolovnoMestoModule],
  controllers: [KomentarController],
  providers: [KomentarService],
})
export class KomentarModule {}
