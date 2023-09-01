import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ErrorService } from '../servicios/error/error.service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private router : Router, private errorService : ErrorService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const token = localStorage.getItem('token');
    if (token){
      request = request.clone({setHeaders: {Authorization : `Bearer ${token}`}});
    }
    return next.handle(request).pipe(
      catchError((error : HttpErrorResponse)=>{
        if (error.status === 401){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Acceso denegado",
          });
          this.router.navigate(['/login'])
        } if (error.error.message) {
          this.errorService.msjError(error); 
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Ha occurido un error inesperado",
          });
        }
        
        return throwError(() => new Error('Error'))
      })
    );
  }
}
