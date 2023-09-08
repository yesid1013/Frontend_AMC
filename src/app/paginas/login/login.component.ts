import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { ErrorService } from 'src/app/servicios/error/error.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  submitted = false;
  loading: boolean = false;

  constructor(private fb: FormBuilder, public router: Router, private usarioService: UsuarioService, private errorService : ErrorService) { }

  // Formulario de login
  form_login: FormGroup = this.fb.group({
    correo: this.fb.control('', [Validators.required, Validators.email]),
    contrasena: this.fb.control('', [Validators.required])
  });

  login(value: any) { //Funcionalidad de login
    this.submitted = true; // Marcar que se ha intentado enviar el formulario

    if (this.form_login.valid) {
      
      //Body que se enviara al backned
      const usuario: Usuario = {
        correo: value.correo,
        contrasena: value.contrasena
      };

      this.loading = true;
      this.usarioService.login(usuario).subscribe({
        next: (data) => {
          this.loading = false;
          localStorage.setItem('token', data.token)
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesion exitoso',
            text: 'Bienvenido',
            allowOutsideClick : false

          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/equipos'])
            }
          });
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          //this.errorService.msjError(e);
        }
      })

    }
  }

  

}
