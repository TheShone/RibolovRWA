import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RibolovnoMestoModel } from '../store/types/ribolovnoMesto.module';
import { KomentarModel } from '../store/types/komentar.module';
import { UserModel } from '../store/types/user.module';
import { Store } from '@ngrx/store';
import { RibolovnoMestoState } from '../store/types/ribMesto.interface';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { KomentariState } from '../store/types/komentari.interface';
import { AuthService } from '../services/authService.service';
import { errorSelector, isLoadingSelector, ribolovnoMestoSelector } from '../store/selectors/ribMesto.selectors';
import { isLoadingSelectorr, selectErrorr, selectKomentare } from '../store/selectors/komentari.selectors';
import * as RibolovnoMestoAction from '../store/actions/ribMesto.actions'
import * as KomentariActions from '../store/actions/komentari.actions'
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-moje-ribolovno-mesto',
  templateUrl: './moje-ribolovno-mesto.component.html',
  styleUrls: ['./moje-ribolovno-mesto.component.css']
})
export class MojeRibolovnoMestoComponent implements OnInit {
  form!: FormGroup
  isLoading$ : Observable<boolean>;
  error$ : Observable<String | null>;
  ribMesto$: Observable<RibolovnoMestoModel | null>;
  isLoadingg$: Observable<boolean>
  errorr$: Observable<String|null>
  komentari$: Observable<KomentarModel[]>
  updateRib: boolean=false;
  user!: UserModel;
  ocena: number = 0
  kom: string = ''
  naziv: string = '';
  tipRibe: string = '';
  platforma: boolean= false;
  osvetljenost: boolean= false;
  latitude: number= 0;
  longitude: number=0;
  id:number =0;
  constructor(private store: Store<RibolovnoMestoState>, private route:ActivatedRoute,private datePipe: DatePipe, private storee: Store<KomentariState>, private authService: AuthService)
  {
    this.isLoading$=this.store.select(isLoadingSelector)
    this.ribMesto$ = this.store.select(ribolovnoMestoSelector)
    this.error$ = this.store.select(errorSelector)
    this.isLoadingg$=this.storee.select(isLoadingSelectorr)
    this.errorr$=this.storee.select(selectErrorr)
    this.komentari$=this.storee.select(selectKomentare)
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.store.dispatch(RibolovnoMestoAction.getRibMesto({id}))
      this.storee.dispatch(KomentariActions.getKomentare({id}))
    })
    const userJson=localStorage.getItem('loggedUser');
    if(userJson!= null)
    {
      const userObject = JSON.parse(userJson);
      this.user = new UserModel(
        userObject.id,
        userObject.ime,
        userObject.prezime,
        userObject.username,
        userObject.email,
        undefined,
        new Date(userObject.datumRodjenja),
        userObject.slika
      );
    }
    
  }
  formatDatumPostavljanja(date: Date | string | undefined): string {
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US');
    } else if (typeof date === 'string') {
      const dateObject = new Date(date);
      return dateObject.toLocaleDateString('en-US');
    }
    return 'N/A';
  }
  formatDatumPostavljanjaa(date: Date): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  updateRibolovno(){
    this.updateRib=!this.updateRib;
  }
  deleteRibolovno(){

  }
  updateRibMesto(){

  }
}
