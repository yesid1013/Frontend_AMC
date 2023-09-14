import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { Servicio } from 'src/app/interfaces/servicio';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import jwt_decode from 'jwt-decode';
import { ActivoService } from 'src/app/servicios/activo/activo.service';
import { Activo } from 'src/app/interfaces/activo';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {
  isOpen = false;
  listaServicios: Servicio[] = []
  listaActivos: Activo[] = [];

  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  token: string | null = '';
  submitted = false;

  constructor(private communicationService: ComunicationService, private servicio_service: ServicioService, private fb: FormBuilder, private activo_service: ActivoService) { }

  // Formulario de registrar servicio
  form_servicio: FormGroup = this.fb.group({
    activo: this.fb.control('', [Validators.required]),
    tipo_de_servicio: this.fb.control("Seleccione tipo de servicio",[Validators.required]),
    descripcion: this.fb.control(null, [Validators.required]),
    observaciones: this.fb.control(null, []),
    observacion_usuario: this.fb.control(null, []),
    fecha_de_ejecucion: this.fb.control('', [Validators.required]),
    orden_de_servicio: this.fb.control('', [])
  });

  ngOnInit() {
    this.dtOptions = {
      language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json' }
    };
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    this.obtener_servicios();
    this.obtener_rol();
  }

  obtener_servicios() {
    this.servicio_service.obtener_servicios().subscribe(data => {
      this.listaServicios = data;
      this.dtTrigger.next(null);
    })
  }

  obtener_rol() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      const decodedToken: any = jwt_decode(this.token);
      const rol = decodedToken?.perfil;
      return rol
    }
  }

  obtener_activos() { //Para mostrarlos en el formulario
    this.activo_service.listar_activos().subscribe(data => {
      this.listaActivos = data;
    })
  }

  selectedActivoId: string = '';

  onActivoSelect(event: Event) { //Para saber el id_activo seleccionado en el datalist del formulario de registro
    const selectedText = (event.target as HTMLInputElement).value;
    const selectedOption = this.listaActivos.find(activo => activo.id_primario === selectedText);

    if (selectedOption) {
      this.selectedActivoId = selectedOption.id_activo;
      console.log('ID de activo seleccionado:', this.selectedActivoId);
    }
  }

}
