import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserModel } from "../store/types/user.module";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class UserService{
    constructor(private http: HttpClient, private router: Router) {}
    getAllUsers(): Observable<UserModel[]>{
        return this.http.get<UserModel[]>('http://localhost:3000/user/getAllUsers',{withCredentials:true})
    }
    deleteUser(id:number):Observable<UserModel>{
        return this.http.delete<UserModel>(`http://localhost:3000/user/deleteUser/${id}`,{withCredentials:true})
    }
} 