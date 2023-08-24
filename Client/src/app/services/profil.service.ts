import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "../store/types/user.module";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class ProfilService {
    constructor(private http: HttpClient) {}
  
    getProfil(id:number): Observable<UserModel>
    {
      return this.http.get<UserModel>(`http://localhost:3000/user/getUser/${id}`,{withCredentials:true})
    }
    updateProfil(user:UserModel): Observable<UserModel>
    {
      const userData = {
        id: user.id,
        ime : user.ime,
        prezime : user.prezime,
        username : user.username,
        email : user.email,
        password : user.password,
        role : user.role,
        datumRodjenja : user.datumRodjenja,
        slika : user.slika,
      }
      return this.http.put<UserModel>(`http://localhost:3000/user/updateUser`, userData, {withCredentials:true});
    }
  }