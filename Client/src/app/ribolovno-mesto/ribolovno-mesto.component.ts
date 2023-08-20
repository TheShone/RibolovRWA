import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RibolovnoMestoModel } from '../store/types/ribolovnoMesto.module';
import { RibolovnoMestoState } from '../store/types/ribMesto.interface';
import { Store } from '@ngrx/store';
import { errorSelector, isLoadingSelector, ribolovnoMestoSelector } from '../store/selectors/ribMesto.selectors';
import { ActivatedRoute } from '@angular/router';
import * as RibolovnoMestoAction from '../store/actions/ribMesto.actions'
@Component({
  selector: 'app-ribolovno-mesto',
  templateUrl: './ribolovno-mesto.component.html',
  styleUrls: ['./ribolovno-mesto.component.css']
})
export class RibolovnoMestoComponent implements OnInit{
  isLoading$ : Observable<boolean>;
  error$ : Observable<String | null>;
  ribMesto$: Observable<RibolovnoMestoModel | null>;
  constructor(private store: Store<RibolovnoMestoState>, private route:ActivatedRoute)
  {
    this.isLoading$=this.store.select(isLoadingSelector)
    this.ribMesto$ = this.store.select(ribolovnoMestoSelector)
    this.error$ = this.store.select(errorSelector)
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.store.dispatch(RibolovnoMestoAction.getRibMesto({id}))
    })
  }

}
