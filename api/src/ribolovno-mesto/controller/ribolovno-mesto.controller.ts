import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RibolovnoMestoEntity } from '../models/ribolovnoMesto.entity';
import { RibolovnoMestoService } from '../services/ribolovno-mesto.service';
import { RibolovnoMestoDto } from '../dto/ribolovnoMesto.dto';
import { RibolovnoMestoUpdateDto } from '../dto/ribolovnoMestoUpdate.dto';
import { UserGuard } from 'src/guards/user-role.guard';

@Controller('ribolovno-mesto')
export class RibolovnoMestoController {
  constructor(private ribolovnoMestoService: RibolovnoMestoService) {

  }
  @Post('addRibolovnoMesto')
  @UseGuards(UserGuard)
  addRibolovnoMesto(@Body() ribMesto: RibolovnoMestoDto)
  {
    return this.ribolovnoMestoService.addRibolovnoMesto(ribMesto)
  }
  @Delete('deleteRibolovnoMesto/:id')
  @UseGuards(UserGuard)
  deleteRibolovnoMesto(@Param('id') id:number)
  {
    return this.ribolovnoMestoService.deleteRibolovnoMesto(id)
  }
  @Put('updateRibolovnoMesto')
  @UseGuards(UserGuard)
  updateRibolovnoMesto(@Body() ribMesto: RibolovnoMestoUpdateDto)
  {
    return this.ribolovnoMestoService.updateRibolovnoMesto(ribMesto)
  }
  @Get('getRibolovnoMesto/:id')
  getRibolovnoMesto(@Param('id') id:number)
  {
    return this.ribolovnoMestoService.getRibolovnoMesto(id)
  }
  @Get('getRibolovnaMestaPoKorisniku/:id')
  @UseGuards(UserGuard)
  getRibolovnaMestaPoKorisniku(@Param('id') id:number)
  {
    return this.ribolovnoMestoService.getRibolovnaPoKorisniku(id)
  }
  @Get('getRibolovnaMesta')
  getRibolovnaMesta()
  {
    return this.ribolovnoMestoService.getRibolovnaMesta();
  }
}
