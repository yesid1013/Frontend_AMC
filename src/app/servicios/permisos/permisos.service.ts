import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editar_permiso, Permiso, PermisosDeActivo, Permisos_creados, Permisos_recibidos, Registrar_permiso } from 'src/app/interfaces/permiso';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  url ='http://127.0.0.1:5000/api/v1/';

  constructor(private http: HttpClient) { }

  permisos_creados():Observable<Permisos_creados[]>{
    return this.http.get<Permisos_creados[]>(`${this.url}permisos_creados`);
  }

  permisos_de_activo(id_activo : any):Observable<PermisosDeActivo[]>{
    return this.http.get<PermisosDeActivo[]>(`${this.url}permisos/${id_activo}`);
  }

  permisos_recibidos():Observable<Permisos_recibidos[]>{
    return this.http.get<Permisos_recibidos[]>(`${this.url}permisos`);
  }

  buscar_permiso_por_activo_y_usuario(id_activo : any):Observable<any>{
    return this.http.get(`${this.url}permiso_usuario/${id_activo}`);
  }

  obtener_permiso(id_permiso : any):Observable<Permiso>{
    return this.http.get<Permiso>(`${this.url}permiso/${id_permiso}`);
  }

  registrar_permiso(permiso : Registrar_permiso):Observable<any>{
    return this.http.post(`${this.url}permisos`,permiso);
  }

  editar_permiso(id_permiso : string, editar_permiso : Editar_permiso):Observable<any>{
    return this.http.put(`${this.url}permiso/${id_permiso}`,editar_permiso);
  }

  eliminar_permiso(id_permiso : string){
    return this.http.delete(`${this.url}permiso/${id_permiso}`);
  }
}
