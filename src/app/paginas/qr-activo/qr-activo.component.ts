import { Component,TemplateRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoActivoQr } from 'src/app/interfaces/activo';
import { ActivoService } from 'src/app/servicios/activo/activo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';





@Component({
  selector: 'app-qr-activo',
  templateUrl: './qr-activo.component.html',
  styleUrls: ['./qr-activo.component.css']
})
export class QrActivoComponent {
  
  id_activo: any = null;
  activoData: InfoActivoQr | null = null;
  submitted = false;
  loading: boolean = false;
  mostrarContrasena: boolean = false;

  iconoMostrar: SafeHtml;
  iconoOcultar: SafeHtml;



  //Modal
  modalRef?: BsModalRef;

  constructor(private route: ActivatedRoute, private activoService : ActivoService,private fb: FormBuilder,private usarioService: UsuarioService, private router: Router,private modalService: BsModalService, private sanitizer: DomSanitizer){
    //Iconos para mostrar y ocultar constraseña
    const svgMostrar = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
    </svg>`;
    const svgOcultar = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
    <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
    <path d="M3 3l18 18" />
    </svg>`
    
    this.iconoMostrar = this.sanitizer.bypassSecurityTrustHtml(svgMostrar);
    this.iconoOcultar = this.sanitizer.bypassSecurityTrustHtml(svgOcultar);
  }

  // Formulario de login
  form_login: FormGroup = this.fb.group({
    correo: this.fb.control('', [Validators.required, Validators.email]),
    contrasena: this.fb.control('', [Validators.required])
  });

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id_activo = params.get('id_activo');
    });
    this.obtener_info_activo();
  }

  obtener_info_activo(){
    this.activoService.info_activo_qr(this.id_activo).subscribe(data =>{
      this.activoData = data;
    })
  }

  login(value: any){
    this.submitted = true;
    

    if (this.form_login.valid) {
      const usuario: Usuario = {
        correo: value.correo,
        contrasena: value.contrasena
      };

      this.usarioService.login(usuario).subscribe({
        next: (data) => {
          
          localStorage.setItem('token', data.token);
          localStorage.setItem('nombre', data.nombre);
          this.modalRef?.hide();
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido '+data.nombre,
            allowOutsideClick : false

          }).then((result) => {
            if (result.isConfirmed) {
              
              this.router.navigateByUrl('/servicios')
            }
          });
        },
        error: (e: HttpErrorResponse) => {
        }
      })
    }

    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
}



    
    

}
