import { AuthService } from './../services/authService.service';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RibolovnoMestoModel } from '../store/types/ribolovnoMesto.module';
import { RibolovnoMestoState } from '../store/types/ribMesto.interface';
import { Store } from '@ngrx/store';
import { errorSelector, isLoadingSelector, ribolovnoMestoSelector } from '../store/selectors/ribMesto.selectors';
import { ActivatedRoute } from '@angular/router';
import * as RibolovnoMestoAction from '../store/actions/ribMesto.actions'
import { DatePipe } from '@angular/common';
import { KomentarModel } from '../store/types/komentar.module';
import { KomentariState } from '../store/types/komentari.interface';
import { isLoadingSelectorr, selectErrorr, selectKomentare } from '../store/selectors/komentari.selectors';
import * as KomentariActions from '../store/actions/komentari.actions'
import { Collection } from 'ngx-pagination';
import { UserModel } from '../store/types/user.module';
@Component({
  selector: 'app-ribolovno-mesto',
  templateUrl: './ribolovno-mesto.component.html',
  styleUrls: ['./ribolovno-mesto.component.css']
})
export class RibolovnoMestoComponent implements OnInit{
  isLoading$ : Observable<boolean>;
  error$ : Observable<String | null>;
  ribMesto$: Observable<RibolovnoMestoModel | null>;
  isLoadingg$: Observable<boolean>
  errorr$: Observable<String|null>
  komentari$: Observable<KomentarModel[]>
  dodajKomentar: boolean=false;
  latitude!: number;
  longitude!: number;
  user!: UserModel;
  ocena: number = 0
  kom: string = ''
  display: any;
  zoom = 12;
  maxZoom = 15;
  minZoom = 8;
  markers = []  as  any;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom:this.maxZoom,
    minZoom:this.minZoom,
  }
  constructor(private store: Store<RibolovnoMestoState>, private route:ActivatedRoute,private datePipe: DatePipe, private storee: Store<KomentariState>, private authService: AuthService)
  {
    this.isLoading$=this.store.select(isLoadingSelector)
    this.ribMesto$ = this.store.select(ribolovnoMestoSelector)
    this.error$ = this.store.select(errorSelector)
    this.isLoadingg$=this.storee.select(isLoadingSelectorr)
    this.errorr$=this.storee.select(selectErrorr)
    this.komentari$=this.storee.select(selectKomentare)
    this.ribMesto$.subscribe((ribMesto)=>{
      if(ribMesto!=undefined)
      {
      this.latitude=ribMesto.Latitude
      this.longitude=ribMesto.Longitude
      }
    })
  }
  addMarker() {
    this.markers.push({
      position: {
        lat: +this.latitude,
        lng: +this.longitude,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.store.dispatch(RibolovnoMestoAction.getRibMesto({id}))
      this.storee.dispatch(KomentariActions.getKomentare({id}))
      this.ribMesto$.subscribe(ribMesto => {
        if (ribMesto) {
          console.log(ribMesto.Latitude + " "+ ribMesto.Longitude)
          this.center={
            lat: +this.latitude,
            lng: +this.longitude
          };
          this.zoom = 12;
          this.addMarker();
        }
      });
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
  dodajKomentarClick(){
    if(this.user)
      this.dodajKomentar=!this.dodajKomentar;
    else
      alert("Niste ulogovani")
  }
  Handle(event: number)
  {
    this.ocena=event
  }
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  saveKomentarClick(){
    if (this.user!==null) {
      this.ribMesto$.subscribe(ribMesto => {
        if (ribMesto) {
          const comment = new KomentarModel(this.kom, this.ocena, new Date(), this.user, ribMesto);
          this.store.dispatch(KomentariActions.createComment({komentar: comment}))
          this.dodajKomentar=false;
        } else {
          console.error("Ribolovno mesto nije pronađeno.");
        }
      });
    } else {
      alert("Niste ulogovani");
    }  
  }
  
}
