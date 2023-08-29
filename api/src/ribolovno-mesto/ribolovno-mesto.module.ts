import { Module } from '@nestjs/common';
import { RibolovnoMestoService } from './services/ribolovno-mesto.service';
import { RibolovnoMestoController } from './controller/ribolovno-mesto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RibolovnoMestoEntity } from './models/ribolovnoMesto.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from 'src/guards/amin-role.guard';
import { LoggedGuard } from 'src/guards/logged.guard';
import { UserGuard } from 'src/guards/user-role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([RibolovnoMestoEntity]), UserModule,
  JwtModule.register({
    secret: 'your-secret-key',
    signOptions: { expiresIn: '1h' },
  })],
  providers: [RibolovnoMestoService, AdminGuard,LoggedGuard,UserGuard],
  controllers: [RibolovnoMestoController],
  exports:[RibolovnoMestoService]
})
export class RibolovnoMestoModule {}
