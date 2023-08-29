import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from '../guards/amin-role.guard';
import { LoggedGuard } from 'src/guards/logged.guard';
import { UserGuard } from 'src/guards/user-role.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService, AdminGuard,LoggedGuard,UserGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
