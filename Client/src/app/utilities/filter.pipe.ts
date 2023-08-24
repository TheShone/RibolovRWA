import { Pipe, PipeTransform } from '@angular/core';
import { RibolovnoMestoModel } from '../store/types/ribolovnoMesto.module';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: RibolovnoMestoModel[]| null, searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter(item => item.Naziv.toLowerCase().includes(searchText)); 
  }
}