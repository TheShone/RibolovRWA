import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KomentarModel } from '../store/types/komentar.module';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class KomentariService{
    constructor(private http: HttpClient, private router: Router) {}
    getKomentareZaRibolovnMesto(id:number): Observable<KomentarModel[]>
    {
        return this.http.get<KomentarModel[]>(`http://localhost:3000/komentar/getKomentareZaRibolovnoMesto/${id}`,{withCredentials:true})
    }
  }
  