import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activo, Registro_activo } from 'src/app/interfaces/activo';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {
  url ='http://127.0.0.1:5000/api/v1/';

  constructor(private http: HttpClient) { }

  listar_activos():Observable<Activo[]>{
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.get<Activo[]>(`${this.url}listar_activos`);
  }

  registrar_activo(activo : Registro_activo):Observable<any>{
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.post(`${this.url}create_activo`,activo);
  }
}
