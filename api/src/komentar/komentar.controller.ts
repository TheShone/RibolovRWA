import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { KomentarService } from './komentar.service';
import { CreateKomentarDto } from './dto/create-komentar.dto';
import { UpdateKomentarDto } from './dto/update-komentar.dto';

@Controller('komentar')
export class KomentarController {
  constructor(private readonly komentarService: KomentarService) {}

  @Post('addKomentar')
  addKomentar(@Body() createKomentarDto: CreateKomentarDto) {
    return this.komentarService.create(createKomentarDto);
  }

  @Get('getKomentareZaRibolovnoMesto/:id')
  getKomentareZaRibolovnoMesto(@Param('id') id:number) {
    return this.komentarService.getKomentareZaRibolovnoMesto(id);
  }

  @Get('getKomentarID:id')
  findOne(@Param('id') id: number) {
    return this.komentarService.findOne(+id);
  }

  @Put('IzmeniKomentar:id')
  update(@Param('id') id: number, @Body() updateKomentarDto: UpdateKomentarDto) {
    return this.komentarService.update(+id, updateKomentarDto);
  }

  @Delete('obrisiKomentar:id')
  remove(@Param('id') id: number) {
    return this.komentarService.remove(+id);
  }
}
