import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { RibolovnoMestoModel } from '../store/types/ribolovnoMesto.module';
import { KomentarModel } from '../store/types/komentar.module';
import { UserModel } from '../store/types/user.module';
import { Store } from '@ngrx/store';
import { RibolovnoMestoState } from '../store/types/ribMesto.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { KomentariState } from '../store/types/komentari.interface';
import { AuthService } from '../services/authService.service';
import { errorSelector, isLoadingSelector, ribolovnoMestoSelector } from '../store/selectors/ribMesto.selectors';
import { isLoadingSelectorr, selectErrorr, selectKomentare } from '../store/selectors/komentari.selectors';
import * as RibolovnoMestoAction from '../store/actions/ribMesto.actions'
import * as KomentariActions from '../store/actions/komentari.actions'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MojaRibolovnaMestaState } from '../store/types/mojaRibMesta.interface';
import * as MojaRibolovnaMestaActions from '../store/actions/mojaRibMesta.actions'
import { updateSelector } from '../store/selectors/mojaRibMesta.selectors';

@Component({
  selector: 'app-moje-ribolovno-mesto',
  templateUrl: './moje-ribolovno-mesto.component.html',
  styleUrls: ['./moje-ribolovno-mesto.component.css']
})
export class MojeRibolovnoMestoComponent implements OnInit {
  @Input() ribolovnoMestoId: number | undefined;
  @Output() ribolovnoMestoDeleted: EventEmitter<number> = new EventEmitter<number>();
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
  filePath :string = '';
  platforma: boolean= false;
  osvetljenost: boolean= false;
  latitude: number= 0;
  longitude: number=0;
  id:number =0;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  datumPostavljanja: Date = new Date()
  latitudee!: number;
  longitudee!: number;
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
  constructor(private store:Store<RibolovnoMestoState>, private storeee:Store<MojaRibolovnaMestaState>, private route:ActivatedRoute,private datePipe: DatePipe, private storee: Store<KomentariState>, private authService: AuthService,private storage: AngularFireStorage,private formBuilder: FormBuilder,private router:Router)
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
      this.latitudee=ribMesto.Latitude
      this.longitudee=ribMesto.Longitude
      }
    })
  }
  addMarker() {
    this.markers.push({
      position: {
        lat: +this.latitudee,
        lng: +this.longitudee,
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
      this.form = this.formBuilder.group({
        naziv: new FormControl('',Validators.required),
        tipRibe: new FormControl('',Validators.required),
        platforma: new FormControl(''),
        osvetljenost: new FormControl(''),
        latitude: new FormControl('',Validators.required),
        longitude: new FormControl('',Validators.email),
        slika: new FormControl('')
      })
      this.ribMesto$.subscribe(ribMesto => {
        if (ribMesto) {
          this.center={
            lat: +this.latitudee,
            lng: +this.longitudee
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
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
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
    this.ribMesto$.subscribe(ribMesto=>{
      if(ribMesto!=null)
      {
        this.id = ribMesto.id,
        this.naziv=ribMesto.Naziv
        this.form.patchValue({
          tipRibe: ribMesto.TipRibe
        })
        this.tipRibe=ribMesto.TipRibe
        this.platforma=ribMesto.PostojanjePlatforme,
        this.osvetljenost=ribMesto.Osvetljenost,
        this.latitude=ribMesto.Latitude,
        this.longitude=ribMesto.Longitude,
        this.datumPostavljanja=ribMesto.datumPostavljanja
      }
    })

  }
  
  deleteRibolovno(){
    this.route.params.subscribe(params => {
      const id = params['id'];
    if(confirm("Jeste li sigurni da zelite da obrisete ovo ribolovno mesto")){
        this.storeee.dispatch(MojaRibolovnaMestaActions.deleteRibolovnoMesto({id:id}))
        this.router.navigate(['/mojaRibolovnaMesta']);
    }
  })
  }
  updateRibMesto(){
    if(this.selectedFile)
    {
     this.filePath = `profile_images/${Date.now()}_${this.selectedFile!.name}`;
     const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.selectedFile);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async (url) => {
          this.imageUrl = url;
          if(this.imageUrl!==null)
          {
            const ribMesto = new RibolovnoMestoModel(this.id,this.naziv,this.tipRibe,this.platforma,this.osvetljenost,this.latitude,this.longitude,
            this.datumPostavljanja,this.imageUrl,this.user)
            console.log(ribMesto)
            this.store.dispatch(RibolovnoMestoAction.updateRibolovnoMesto({ribMesto}))
            this.updateRib=!this.updateRib;
            
          }

        });
      })
    ).subscribe();
    }
    else
    {
      alert("Unesi sliku")
    }

  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
