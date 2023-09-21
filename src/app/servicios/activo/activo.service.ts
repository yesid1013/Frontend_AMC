import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activo, Editar_activo, Registro_activo } from 'src/app/interfaces/activo';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {
  url ='http://127.0.0.1:5000/api/v1/';

  constructor(private http: HttpClient) { }

  listar_activos():Observable<Activo[]>{
    return this.http.get<Activo[]>(`${this.url}listar_activos`);
  }

  registrar_activo(activo : Registro_activo):Observable<any>{
    return this.http.post(`${this.url}create_activo`,activo);
  }

  editar_activo(id_activo : any, activo : Editar_activo){
    return this.http.put(`${this.url}activo/${id_activo}`,activo);
  }

  eliminar_activo(id_activo : string){
    return this.http.delete(`${this.url}activo/${id_activo}`);
  }

  activos_eliminados():Observable<Activo[]>{
    return this.http.get<Activo[]>(`${this.url}activos_eliminados`);
  }

  restaurar_activo(id_activo : string){
    return this.http.put(`${this.url}activos/${id_activo}/restaurar`,null);
  }

  activos_sin_ficha_tecnica():Observable<Activo[]>{
    return this.http.get<Activo[]>(`${this.url}activos_sin_ficha`)
  }
}
