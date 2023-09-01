import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url ='http://127.0.0.1:5000/api/v1/';

  constructor(private http: HttpClient) { }

  login(usuario : Usuario):Observable<any>{
    return this.http.post(`${this.url}login`,usuario);
  }
}
