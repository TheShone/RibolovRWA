import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient, private storage: AngularFireStorage) {}

  async registerUser(formData: any): Promise<boolean> {
    try{
     await this.http.post('http://localhost:3000/user/addUser', formData).toPromise()
     return true;
    }
    catch(error: any)
    {
        alert(error.error.message)
        return false;
    }
  }
}