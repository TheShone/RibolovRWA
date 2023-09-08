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
import { UseriState } from '../store/types/useri.interface';
import { selectorUser } from '../store/selectors/user.selectors';
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
  userr!: Observable<UserModel | null>;
  ribolovnoMesto!: RibolovnoMestoModel;
  dodajKomentar: boolean=false;
  isAdmin: boolean = false;
  isLogedIn=false;
  poklapanje: boolean=false;
  latitude!: number;
  longitude!: number;
  user!: UserModel;
  ocena: number = 0
  kom: string = ''
  display: any;
  zoom = 12;
  maxZoom = 15;
  naziv: string=''
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
  constructor(private store: Store<RibolovnoMestoState>, private route:ActivatedRoute,private datePipe: DatePipe, private storee: Store<KomentariState>, private authService: AuthService,private storeee: Store<UseriState>)
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
      this.naziv=ribMesto.Naziv
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
        text: this.naziv,
      },
      title: this.naziv,
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
          this.center={
            lat: +this.latitude,
            lng: +this.longitude
          };
          this.zoom = 12;
          this.addMarker();
          this.ribolovnoMesto=ribMesto
        }
      });
    })
    this.komentari$.subscribe((komentari)=>{
      console.log(komentari)
    })
    const loginObject = localStorage.getItem('isLoggedIn')
    if(loginObject!= null)
    {
      this.isLogedIn=true;
    }
    this.userr = this.storeee.select(selectorUser)
    if(this.userr)
    {
      this.userr.subscribe((user)=>{
        if(user?.role==="admin")
      {
        this.isAdmin=true;
      }
      else
      {
        this.isAdmin=false;
      }
      })
    }
    const userJson=localStorage.getItem('loggedUser');
    if(userJson!= null)
    {
      const userObject = JSON.parse(userJson);
      const role = userObject.role;
        if(role==='admin')
          this.isAdmin=true;
        else
          this.isAdmin=false;
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
      const comment = new KomentarModel(55,this.kom, this.ocena, new Date(), this.user, this.ribolovnoMesto);
      this.store.dispatch(KomentariActions.createComment({komentar: comment}))
      this.dodajKomentar=false;
    } else {
      alert("Niste ulogovani");
    }  
  }
  delete(id:number){
    if(confirm('Jeste sigurni da hocete da obrisete komentar'))
    {
      this.store.dispatch(KomentariActions.deleteComment({id}))
    }
  }
  
}
