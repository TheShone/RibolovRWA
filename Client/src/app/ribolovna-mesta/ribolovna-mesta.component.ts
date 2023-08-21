import { Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RibolovnaMestaService } from '../services/ribolovnaMesta.service';
import { RibolovnoMestoModel } from '../store/types/ribolovnoMesto.module';
import { Store, select } from '@ngrx/store';
import { RibolovnaMestaState } from '../store/types/ribolovnaMesta.interface';
import { selectRibMestaFeature, selectorError, selectorLoading, selectorRibMesta } from '../store/selectors/ribMesta.selectors';
import * as RibolovnaMestaActions from '../store/actions/ribMesta.actions'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-ribolovna-mesta',
  templateUrl: './ribolovna-mesta.component.html',
  styleUrls: ['./ribolovna-mesta.component.css']
})
export class RibolovnaMestaComponent implements OnInit {
  isLoading$ : Observable<boolean>;
  error$ : Observable<String | null>;
  ribMesta$ : Observable<RibolovnoMestoModel[]>;
  constructor(private ribolovnaMestaService: RibolovnaMestaService,private store: Store<RibolovnaMestaState>,private datePipe: DatePipe)
  {
    this.isLoading$ = this.store.select(selectorLoading);
    this.error$=this.store.select(selectorError);
    this.ribMesta$=this.store.select(selectorRibMesta);
  }
  ngOnInit(): void {
    this.store.dispatch(RibolovnaMestaActions.getRibolovnaMesta())
    this.ribMesta$.subscribe((ribMesto)=>{
      console.log(ribMesto)
    })
  }
  getBackgroundStyle(imageUrl: string) {
    return {
      'background-image': `url(${imageUrl})`
    };
  }
  formatDatumPostavljanja(date: Date): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
