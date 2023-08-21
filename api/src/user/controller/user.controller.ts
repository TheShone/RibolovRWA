import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { LoginDto, UserEntity } from '../models/user.entity';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';
import {Response,Request} from 'express'
import { AuthGuard} from '@nestjs/passport'

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService ,
        private jwtService: JwtService
        ){

    }
    @Post('addUser')
    create(@Body() userr: UserEntity) {
        return this.userService.createUser(userr)
    }
    @Delete('deleteUser/:id')
    removeUser(@Param('id') id:number){
        return this.userService.deleteUser(id)
    }
    @Get('getAllUsers')
    getUsers(){
        return this.userService.getAllUsers()
    }
    @Get('getUser/:id')
    getUser(@Param('id') id:number)
    {
        return this.userService.getUser(id)
    }
    @Put('updateUser')
    updateUser(@Body() userr: UserEntity)
    {
        return this.userService.updateUser(userr)
    }
    @Get('getUserEmail/:email')
    getUserEmail(@Param('email') email:string)
    {
        return this.userService.getUseraEmail(email)
    }
    @Get('getUseraUsername/:username')
    getUseraUsername(@Param('username') username:string)
    {
        return this.userService.getUseraUsername(username)
    }
    @UseGuards(AuthGuard('local'))
    @Post('login')
  async login(@Res({ passthrough: true }) response: Response,@Body()loginDTO:LoginDto) {
    const token = await this.userService.signIn(loginDTO);
    response.cookie('jwt', token, { httpOnly: true });
    const user =await this.userService.getUseraUsername(loginDTO.username)
    const { password, ...result } = user
    return result;
  }
    @Get('getLoggedUser')
    async getLoggedUser(@Req() request:Request){
        try{
            const cookie = request.cookies['jwt']
            const data = await this.jwtService.verifyAsync(cookie)
            if(!data)
            {
                throw new UnauthorizedException();
            }
            const userr = await this.userService.getUseraUsername(data['username'])
            const { password, ...result } = userr
            return result;
        }
        catch(e){
            throw new UnauthorizedException();
        } 
    }
    @Post('logout')
    async logout(@Res( {passthrough: true}) response: Response){
        response.clearCookie('jwt');

        return{
            message:'success'
        }
    }

}
