import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoActivoQr } from 'src/app/interfaces/activo';
import { ActivoService } from 'src/app/servicios/activo/activo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-qr-activo',
  templateUrl: './qr-activo.component.html',
  styleUrls: ['./qr-activo.component.css']
})
export class QrActivoComponent {
  id_activo: any = null;
  activoData: InfoActivoQr | null = null;
  submitted = false;

  constructor(private route: ActivatedRoute, private activoService : ActivoService,private fb: FormBuilder){
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
  }

}
