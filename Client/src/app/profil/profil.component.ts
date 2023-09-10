import { Component, OnInit } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { UserModel } from '../store/types/user.module';
import { ProfilState } from '../store/types/profil.interface';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { errorSelector, isLoadingSelector, profilSelector } from '../store/selectors/profile.selectors';
import * as ProfilActions from '../store/actions/profil.actions'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as RibolovnoMestoAction from '../store/actions/profil.actions'
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  form!: FormGroup
  isLoading$ : Observable<boolean>;
  error$ : Observable<String | null>;
  profil$: Observable<UserModel|null>;
  id:number =0;
  updateRib: boolean = false;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  filePath :string = '';
  ime: string = ' ';
  user!: UserModel;
  prezime: string= ' ';
  username: string= ' ';
  email: string= ' ';
  password: string=' ';
  datumRodjenja: Date = new Date();
  isLoggedIn:boolean= false;
  constructor(private store: Store<ProfilState>, private route:ActivatedRoute,private datePipe: DatePipe,private storage: AngularFireStorage,private formBuilder: FormBuilder)
  {
    this.isLoading$=this.store.select(isLoadingSelector)
    this.profil$ = this.store.select(profilSelector)
    this.error$ = this.store.select(errorSelector)
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
  ngOnInit(): void {
    const userJson=localStorage.getItem('loggedUser');
    if(userJson!= null)
    {
      const userObject = JSON.parse(userJson);
      this.id = userObject.value.id
      this.store.dispatch(ProfilActions.getProfil({id:this.id}))
      
    }
    this.form = this.formBuilder.group({
      ime: new FormControl('',Validators.required),
      prezime: new FormControl('',Validators.required),
      username: new FormControl('',Validators.required),
      email: new FormControl('',Validators.email),
      password: new FormControl('',Validators.required),
      datumRodjenja: new FormControl('',Validators.required),
      slika: new FormControl('')
    });
    this.profil$.subscribe((profil)=>{
      if(profil)
        this.isLoggedIn=true;
    })
  }
  update(){
    this.updateRib=!this.updateRib;

    this.profil$.subscribe(profil=>{
      if(profil!==null)
      {
        const dateOfBirth = new Date(profil.datumRodjenja!);
        const formattedDate = this.datePipe.transform(dateOfBirth, 'yyyy-MM-dd');
        this.form.patchValue({
          ime: profil.ime,
          prezime: profil.prezime,
          username: profil.username,
          email: profil.email,
          datumRodjenja: formattedDate,
        });
      }
    })
  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
  updateProfil(){
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
              if(this.password!=='')
              {
                this.user = new UserModel(
                  this.id,
                  this.form.value.ime,
                  this.form.value.prezime,
                  this.form.value.username,
                  this.form.value.email,
                  this.form.value.password,
                  this.form.value.datumRodjenja,
                  this.imageUrl
                )
                this.store.dispatch(RibolovnoMestoAction.updateProfil({user:this.user}))
                this.updateRib=!this.updateRib;
              }
              else
              {
                alert("Unesi password")
              }
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
}
