import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { RibolovnoMestoModel } from '../store/types/ribolovnoMesto.module';
import { KomentarModel } from '../store/types/komentar.module';

@Injectable({
  providedIn: 'root'
})
export class RibolovnaMestaService {
  constructor(private http: HttpClient, private router: Router) {}

  getAllRibolovnaMesta(): Observable<RibolovnoMestoModel[]>
  {
    return  this.http.get<RibolovnoMestoModel[]>('http://localhost:3000/ribolovno-Mesto/getRibolovnaMesta',{withCredentials:true})
  }

  getRibolovnoMestoId(id:number): Observable<RibolovnoMestoModel>
  {
    console.log("pokrecem se")
    return this.http.get<RibolovnoMestoModel>(`http://localhost:3000/ribolovno-Mesto/getRibolovnoMesto/${id}`,{withCredentials:true})
  }

}