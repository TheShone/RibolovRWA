import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http"
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { RegistrationService } from '../services/registrationService.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  form!: FormGroup
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  bsValue = new Date();
   bsRangeValue: Date[];
   maxDate = new Date();
   minDate = new Date();

   constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private router:Router, private storage: AngularFireStorage, private registrationService:RegistrationService) {
      this.minDate.setDate(this.minDate.getDate() - 1);
      this.maxDate.setDate(this.maxDate.getDate() + 7);
      this.bsRangeValue = [this.bsValue, this.maxDate];
   }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ime: new FormControl('',Validators.required),
      prezime: new FormControl('',Validators.required),
      username: new FormControl('',Validators.required),
      email: new FormControl('',Validators.email),
      password: new FormControl('',Validators.required),
      datum: new FormControl('',Validators.required),
      //slika: new FormControl('',Validators.required)
    })
  }
  register(): void {
    
      const filePath = `profile_images/${Date.now()}_${this.selectedFile!.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(async (url) => {
            this.imageUrl = url; 

            const formData = { ...this.form.getRawValue(), slika: this.imageUrl };
            const provera:boolean=await this.registrationService.registerUser(formData)
            if(provera){
              this.router.navigate(['/login']);
            }else{
              alert("Doslo je do greske sa registrovanjem");
            }
          });
        })
      ).subscribe();

  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

}
