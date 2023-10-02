import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adjuntar_cotizacion, Servicio } from 'src/app/interfaces/servicio';

@Injectable({
  providedIn: 'root'
})
export class CostoServicioService {
  url ='http://127.0.0.1:5000/api/v1/';

  constructor(private http: HttpClient) { }

  servicios_sin_cotizacion():Observable<Servicio[]>{
    return this.http.get<Servicio[]>(`${this.url}servicios_sin_cotizacion`);
  }

  adjuntar_cotizacion(id_servicio : string, costo_servicio : Adjuntar_cotizacion ):Observable<any>{
    return this.http.post(`${this.url}costo_servicio/${id_servicio}`, costo_servicio);
  }

}
