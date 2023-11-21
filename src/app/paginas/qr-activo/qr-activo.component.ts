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

  //Modal
  modalRef?: BsModalRef;

  constructor(private route: ActivatedRoute, private activoService : ActivoService,private fb: FormBuilder,private usarioService: UsuarioService, private router: Router,private modalService: BsModalService){
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
          localStorage.setItem('nombre', data.nombre)
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido '+data.nombre,
            allowOutsideClick : false

          }).then((result) => {
            if (result.isConfirmed) {
              this.modalRef?.hide();
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


    
    

}
