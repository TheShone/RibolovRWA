import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LoginDto, UserEntity } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}
    async createUser(user: UserEntity){
        let userr = new UserEntity()
        userr = await this.getUseraEmail(user.email)
        if(userr)
        {
            throw new BadRequestException('Postoji user sa tim emailom')
        }
        const newuser = new UserEntity()
        newuser.ime=user.ime;
        newuser.prezime=user.prezime;
        newuser.username=user.username;
        const hashedPassword = await bcrypt.hash(user.password, 10);
        newuser.password = hashedPassword;
        newuser.email=user.email;
        newuser.slika=user.slika;
        newuser.role = 'user';
        return this.userRepository.save(newuser);
    }
    deleteUser(id: number){
        return this.userRepository.delete(id)
    }
    getAllUsers(){
        return this.userRepository.find()
    }
    getUser(id: number){
        return this.userRepository.findOneById(id)
    }
    updateUser(user: UserEntity){
        return this.userRepository.update(user.id,user);
    }
    async getUseraEmail(email: string)
    {
        const user = await this.userRepository.findOne({
            where:{
                email:email
            }
        })
        return user
    }
    async getUseraUsername(username: string)
    {
        const user = await this.userRepository.findOne({
            where:{
                username:username
            }
        })
        return user
    }
    async signIn(loginDto:LoginDto) {
        const user = await this.userRepository.findOne({
          where: { username: loginDto.username },
        });
          const payload = {
            sub: user?.id,
            username: user?.username,
            role: user?.role,
          };
          const jwt = await this.jwtService.signAsync(payload);
          return jwt;
      }

}