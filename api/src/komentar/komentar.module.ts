import { Module } from '@nestjs/common';
import { KomentarService } from './komentar.service';
import { KomentarController } from './komentar.controller';
import { KomentarEntity } from './entities/komentar.entity';
import { UserModule } from 'src/user/user.module';
import { RibolovnoMestoModule } from 'src/ribolovno-mesto/ribolovno-mesto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from 'src/guards/amin-role.guard';
import { LoggedGuard } from 'src/guards/logged.guard';
import { UserGuard } from 'src/guards/user-role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([KomentarEntity]), UserModule, RibolovnoMestoModule,
  JwtModule.register({
    secret: 'your-secret-key',
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [KomentarController],
  providers: [KomentarService, AdminGuard,LoggedGuard,UserGuard],
  exports:[KomentarService]
})
export class KomentarModule {}
