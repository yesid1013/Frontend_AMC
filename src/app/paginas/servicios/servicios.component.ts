import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { RegistroServicio, Servicio } from 'src/app/interfaces/servicio';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import jwt_decode from 'jwt-decode';
import { ActivoService } from 'src/app/servicios/activo/activo.service';
import { Activo } from 'src/app/interfaces/activo';
import Swal from 'sweetalert2';


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

  selectedFile: File | null = null;
  fileName: string | null = null;
  fileMimeType: string | null = null;
  fileContent: string | null = null;

  constructor(private communicationService: ComunicationService, private servicio_service: ServicioService, private fb: FormBuilder, private activo_service: ActivoService) { }

  // Formulario de registrar servicio
  form_servicio: FormGroup = this.fb.group({
    activo: this.fb.control('', [Validators.required]),
    tipo_de_servicio: this.fb.control("Seleccione tipo de servicio",[Validators.required]),
    descripcion: this.fb.control(null, [Validators.required]),
    observaciones: this.fb.control(null, []),
    observaciones_usuario: this.fb.control(null, []),
    fecha_ejecucion: this.fb.control('', [Validators.required]),
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

  obtener_activos() { //Para mostrar los activos en el formulario
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

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
      this.fileMimeType = file.type;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileContent = e.target.result.split(',')[1];
      };
      reader.readAsDataURL(file);
    } else {
      // Si no se seleccionó un archivo, asignar valores nulos
      this.selectedFile = null;
      this.fileName = null;
      this.fileMimeType = null;
      this.fileContent = null;
    }
  }

  registrar_servicio(value : any){
    this.submitted = true;
    const fecha = new Date(value.fecha_ejecucion);
    const fechaFormateada = fecha.toISOString(); // Formato 'YYYY-MM-DD HH:MM:SS'
    if (this.form_servicio.valid){
      const servicio : RegistroServicio = {
        fecha_ejecucion : fechaFormateada,
        descripcion : value.descripcion,
        id_tipo_servicio: value.tipo_de_servicio,
        observaciones : value.observaciones,
        observaciones_usuario : value.observaciones_usuario,

        orden_de_servicio : {
          name :this.fileName,
          content : this.fileContent,
          mimeType : this.fileMimeType
        }
      };

      Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,  // Impide que el usuario cierre el diálogo haciendo clic fuera
        didOpen: () => {
          Swal.showLoading();  // Muestra el spinner
        }
      });
      
      this.servicio_service.registrar_servicio(servicio,this.selectedActivoId).subscribe(data => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Servicio creado correctamente',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
              dtInstance.destroy();
              this.obtener_servicios();
            });
          }
        });
      });
    }
  }

}
