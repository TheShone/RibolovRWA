import { Component, OnInit } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { RibolovnoMestoModel } from '../store/types/ribolovnoMesto.module';
import { Store } from '@ngrx/store';
import { MojaRibolovnaMestaState } from '../store/types/mojaRibMesta.interface';
import { errorSelector, isLoadingSelector, mojaRibMestaSelector } from '../store/selectors/mojaRibMesta.selectors';
import * as MojaRibolovnaMestaActions from '../store/actions/mojaRibMesta.actions'
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../store/types/user.module';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-moja-ribolovna-mesta',
  templateUrl: './moja-ribolovna-mesta.component.html',
  styleUrls: ['./moja-ribolovna-mesta.component.css']
})
export class MojaRibolovnaMestaComponent implements OnInit {
  form!: FormGroup
  isLoading$: Observable<boolean>
  error$: Observable<string|null>
  ribMesta$: Observable<RibolovnoMestoModel[]>
  selectedFile: File | null = null;
  user!: UserModel;
  imageUrl: string | null = null;
  naziv: string = '';
  tipRibe: string = '';
  platforma: boolean= false;
  osvetljenost: boolean= false;
  latitude: number= 0;
  longitude: number=0;
  id:number =0;
  constructor(private store:Store<MojaRibolovnaMestaState>,private datePipe: DatePipe,private formBuilder: FormBuilder,private storage: AngularFireStorage)
  {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.error$=this.store.select(errorSelector)
    this.ribMesta$=this.store.select(mojaRibMestaSelector)
  }
  ngOnInit(): void {
    const userJson=localStorage.getItem('loggedUser');
    if(userJson!= null)
    {
      const userObject = JSON.parse(userJson);
      this.id = userObject.id
      this.store.dispatch(MojaRibolovnaMestaActions.getMojaRibolovnaMesta({id:this.id}))
    }
    this.form = this.formBuilder.group({
      naziv: new FormControl('',Validators.required),
      tipRibe: new FormControl('',Validators.required),
      platforma: new FormControl(''),
      osvetljenost: new FormControl(''),
      latitude: new FormControl('',Validators.required),
      longitude: new FormControl('',Validators.email),
    })
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
  getBackgroundStyle(imageUrl: string) {
    return {
      'background-image': `url(${imageUrl})`
    };
  }
  formatDatumPostavljanja(date: Date): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
  addRibMesto(){
    const filePath = `profile_images/${Date.now()}_${this.selectedFile!.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(async (url) => {
            this.imageUrl = url;
            if(this.imageUrl!==null)
            { 
              const ribMesto = new RibolovnoMestoModel("asd",this.naziv,this.tipRibe,this.platforma,this.osvetljenost,this.latitude
              ,this.longitude,new Date(),this.imageUrl,this.user)
              this.store.dispatch(MojaRibolovnaMestaActions.addRibolovnoMesto({ribMesto}))
            }
          });
        })
      ).subscribe();

  }
}
