import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Novedad, Registro_novedad } from 'src/app/interfaces/novedad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {
  url ='http://127.0.0.1:5000/api/v1/';

  constructor(private http: HttpClient) { }

  registrar_novedad(novedad : Registro_novedad, id_activo : any):Observable<any>{
    return this.http.post(`${this.url}novedad/${id_activo}`,novedad);
  }

  novedades_de_un_activo(id_activo : any):Observable<Novedad[]>{
    return this.http.get<Novedad[]>(`${this.url}novedad/${id_activo}`);
  }

}
