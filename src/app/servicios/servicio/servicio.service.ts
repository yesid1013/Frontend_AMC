import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroServicio, Servicio } from 'src/app/interfaces/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  url ='http://127.0.0.1:5000/api/v1/';

  constructor(private http: HttpClient) { }

  obtener_servicios():Observable<Servicio[]>{
    return this.http.get<Servicio[]>(`${this.url}servicios`);
  }

  registrar_servicio(servicio : RegistroServicio, id_activo : string):Observable<any>{
    return this.http.post(`${this.url}servicios/${id_activo}`,servicio);
  }
}
