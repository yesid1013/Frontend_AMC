import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adjuntar_informe_servicio, EditarServicio, RegistroServicio, Servicio, ServicioDeActivo, ServiciosDeActivoSinCosto } from 'src/app/interfaces/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  url ='http://127.0.0.1:5000/api/v1/';

  constructor(private http: HttpClient) { }

  obtener_servicios():Observable<Servicio[]>{
    return this.http.get<Servicio[]>(`${this.url}servicios`);
  }

  obtener_servicio(id_activo : any):Observable<ServicioDeActivo[]>{
    return this.http.get<ServicioDeActivo[]>(`${this.url}servicios/${id_activo}`);
  }

  obtener_servicio_sin_costo(id_activo : any):Observable<ServiciosDeActivoSinCosto[]>{
    return this.http.get<ServiciosDeActivoSinCosto[]>(`${this.url}servicios_sin_costo/${id_activo}`);
  }

  registrar_servicio(servicio : RegistroServicio, id_activo : string):Observable<any>{
    return this.http.post(`${this.url}servicios/${id_activo}`,servicio);
  }

  editar_servicio(id_servicio : any, servicio : EditarServicio){
    return this.http.put(`${this.url}servicio/${id_servicio}`,servicio);
  }

  eliminar_servicio(id_servicio : string){
    return this.http.delete(`${this.url}servicio/${id_servicio}`);
  }

  servicios_sin_informe():Observable<Servicio[]>{
    return this.http.get<Servicio[]>(`${this.url}servicios_sin_informe`)
  }

  adjuntar_informe(id_servicio : string, informe : Adjuntar_informe_servicio):Observable<any>{
    return this.http.post(`${this.url}informe_servicio/${id_servicio}`,informe);
  }
}
