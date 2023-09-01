import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activo } from 'src/app/interfaces/activo';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {
  url ='http://127.0.0.1:5000/api/v1/';

  constructor(private http: HttpClient) { }

  listar_activos():Observable<Activo[]>{
    return this.http.get<Activo[]>(`${this.url}activos`);
  }
}
