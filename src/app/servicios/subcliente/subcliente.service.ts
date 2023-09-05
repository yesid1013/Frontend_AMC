import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subcliente } from 'src/app/interfaces/subcliente';
@Injectable({
  providedIn: 'root'
})
export class SubclienteService {
  url ='http://127.0.0.1:5000/api/v1/';

  constructor(private http: HttpClient) { }

  listar_subclientes():Observable<Subcliente[]>{
    return this.http.get<Subcliente[]>(`${this.url}subclientes`);
  }
}
