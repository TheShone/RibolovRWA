import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RibolovnoMestoModule } from './ribolovno-mesto/ribolovno-mesto.module';
import { AuthModule } from './auth/auth.module';
import { KomentarModule } from './komentar/komentar.module';
import { AdminGuard } from './guards/admin-role.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserGuard } from './guards/user-role.guard';
import { LoggedGuard } from './guards/logged.guard';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    RibolovnoMestoModule,
    AuthModule,
    KomentarModule,
  ],
  controllers: [AppController],
  providers: [AppService, AdminGuard, UserGuard, LoggedGuard],
})
export class AppModule {}
