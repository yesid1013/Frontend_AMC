import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  msjError(e: HttpErrorResponse){ // Funcion, mensaje de error
    if (e.error.message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.error.message,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Ha ocurrido un error inesperado",
      });

    }
  }

}
