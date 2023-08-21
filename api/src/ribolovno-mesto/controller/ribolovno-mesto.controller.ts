import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RibolovnoMestoEntity } from '../models/ribolovnoMesto.entity';
import { RibolovnoMestoService } from '../services/ribolovno-mesto.service';
import { RibolovnoMestoDto } from '../dto/ribolovnoMesto.dto';
import { RibolovnoMestoUpdateDto } from '../dto/ribolovnoMestoUpdate.dto';

@Controller('ribolovno-mesto')
export class RibolovnoMestoController {
  constructor(private ribolovnoMestoService: RibolovnoMestoService) {

  }
  @Post('addRibolovnoMesto')
  addRibolovnoMesto(@Body() ribMesto: RibolovnoMestoDto)
  {
    return this.ribolovnoMestoService.addRibolovnoMesto(ribMesto)
  }
  @Delete('deleteRibolovnoMesto/:id')
  deleteRibolovnoMesto(@Param('id') id:number)
  {
    return this.ribolovnoMestoService.deleteRibolovnoMesto(id)
  }
  @Put('updateRibolovnoMesto')
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
