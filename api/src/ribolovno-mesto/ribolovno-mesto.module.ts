import { Module } from '@nestjs/common';
import { RibolovnoMestoService } from './services/ribolovno-mesto.service';
import { RibolovnoMestoController } from './controller/ribolovno-mesto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RibolovnoMestoEntity } from './models/ribolovnoMesto.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([RibolovnoMestoEntity]), UserModule],
  providers: [RibolovnoMestoService],
  controllers: [RibolovnoMestoController],
  exports:[RibolovnoMestoService]
})
export class RibolovnoMestoModule {}
