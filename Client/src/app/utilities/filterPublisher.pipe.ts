import { Pipe, PipeTransform } from '@angular/core';
import { RibolovnoMestoModel } from '../store/types/ribolovnoMesto.module';

@Pipe({
  name: 'filterPublisher'
})
export class FilterPipePublisher implements PipeTransform {
  transform(items: RibolovnoMestoModel[]| null, searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter(item => item.user.username?.toLowerCase().includes(searchText)); 
  }
}