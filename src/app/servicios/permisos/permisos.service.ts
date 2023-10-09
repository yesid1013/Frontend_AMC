import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permisos_creados } from 'src/app/interfaces/permiso';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  url ='http://127.0.0.1:5000/api/v1/';

  constructor(private http: HttpClient) { }

  permisos_creados():Observable<Permisos_creados[]>{
    return this.http.get<Permisos_creados[]>(`${this.url}permisos_creados`);
  }
}
