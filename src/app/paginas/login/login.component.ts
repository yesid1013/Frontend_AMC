import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  submitted = false;
  
  constructor (private fb: FormBuilder,public router: Router) {}

  form_login : FormGroup = this.fb.group({
    correo : this.fb.control('',[Validators.required,Validators.email]),
    contrasena : this.fb.control('',[Validators.required])
  });

  login(value:any) {
    this.submitted = true; // Marcar que se ha intentado enviar el formulario
    if (this.form_login.valid) {

    }
  }



}
