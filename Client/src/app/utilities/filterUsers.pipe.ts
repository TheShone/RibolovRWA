import { Pipe, PipeTransform } from '@angular/core';
import { RibolovnoMestoModel } from '../store/types/ribolovnoMesto.module';
import { UserModel } from '../store/types/user.module';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsers implements PipeTransform {
  transform(items: UserModel[]| null, searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter(item => item.username?.toLowerCase().includes(searchText)); 
  }
}