import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editar_permiso, Permisos_creados, Permisos_recibidos, Registrar_permiso } from 'src/app/interfaces/permiso';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  url ='http://127.0.0.1:5000/api/v1/';

  constructor(private http: HttpClient) { }

  permisos_creados():Observable<Permisos_creados[]>{
    return this.http.get<Permisos_creados[]>(`${this.url}permisos_creados`);
  }

  permisos_recibidos():Observable<Permisos_recibidos[]>{
    return this.http.get<Permisos_recibidos[]>(`${this.url}permisos`);
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
