import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { EditarServicio, RegistroServicio, Servicio } from 'src/app/interfaces/servicio';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  id_activo_editar : string = ""

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

  // Formulario de editar servicio
  form_edit_servicio: FormGroup = this.fb.group({
    activo: this.fb.control('', [Validators.required]),
    tipo_de_servicio: this.fb.control("Seleccione tipo de servicio",[Validators.required]),
    descripcion: this.fb.control(null, [Validators.required]),
    observaciones: this.fb.control(null, []),
    observaciones_usuario: this.fb.control(null, []),
    fecha_ejecucion: this.fb.control('', [Validators.required]),
  });

  ngOnInit() {
    this.dtOptions = {
      language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json' }
    };
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    this.obtener_servicios();
    this.obtener_activos()
  }

  obtener_servicios() {
    this.servicio_service.obtener_servicios().subscribe(data => {
      this.listaServicios = data;
      this.dtTrigger.next(null);
    })
  }


  obtener_activos() { //Para mostrar los activos en el formulario
    this.activo_service.listar_activos().subscribe(data => {
      this.listaActivos = data;
    })
  }

  selectedActivoId: string = '';
  seEjecuto_ActivoSelect = false;
  onActivoSelect(event: Event) { //Para saber el id_activo seleccionado en el datalist del formulario de registro
    const selectedText = (event.target as HTMLInputElement).value;
    const selectedOption = this.listaActivos.find(activo => activo.id_primario === selectedText);

    if (selectedOption) {
      this.selectedActivoId = selectedOption.id_activo;
      this.seEjecuto_ActivoSelect = true; // Se ejecutó la función
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
    const fechaFormateada = fecha.toISOString();
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

  orden: boolean = false;
  edit_activo_id : string = "" 
  set_form_edit_servicio(servicio : any){
    if (servicio.orden_de_servicio == null){ //Para saber si el servicio tiene una orden de servicio y mostrar el input tipo file en el formulario
      this.orden = true;
    } else {
      this.orden = false
    }

    const selectedOption = this.listaActivos.find(activo => activo.id_primario === servicio.activo_id_primario);
    if (selectedOption) {
      this.edit_activo_id = selectedOption.id_activo;
    }

    this.form_edit_servicio.setValue({
      activo : servicio.activo_id_primario,
      tipo_de_servicio : servicio.id_tipo_servicio,
      descripcion : servicio.descripcion,
      observaciones : servicio.observaciones,
      observaciones_usuario : servicio.observaciones_usuario,
      fecha_ejecucion : servicio.fecha_ejecucion
    })
    this.id_servicio = servicio.id_servicio;
  }


  id_servicio: any = null;
  editar_servicio(value : any){
    if (this.id_servicio){
      if (this.form_edit_servicio.valid){
        Swal.fire({
          title: '¿Estas seguro de editar este servicio?',
          showDenyButton: true,
          confirmButtonText: 'Editar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed){
            if (this.seEjecuto_ActivoSelect){ //Verifico si la funcion OnActivoSelect se ejcuto para saber si selecciono otro activo para editar y saber su id, y si no se ejecuta es que no selecciono un activo si no que dejo el que estaba por defecto
              this.id_activo_editar = this.selectedActivoId;
            }else{
              this.id_activo_editar = this.edit_activo_id;
            }

            const fecha = new Date(value.fecha_ejecucion);
            const fechaFormateada = fecha.toISOString();
            const editar_servicio : EditarServicio = {
              id_activo : this.id_activo_editar,
              id_tipo_servicio : value.tipo_de_servicio,
              descripcion : value.descripcion,
              observaciones : value.observaciones,
              observaciones_usuario : value.observaciones_usuario,
              fecha_ejecucion : fechaFormateada,

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

            this.servicio_service.editar_servicio(this.id_servicio,editar_servicio).subscribe({
              next : (data) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Edición exitosa',
                  text: 'Servicio editado correctamente',
                  allowOutsideClick: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.seEjecuto_ActivoSelect = false;
                    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
                      dtInstance.destroy();
                      this.obtener_servicios();
                      this.submitted = false;
                    });
                  }
                });
              }
            })
          }
        })
      }
    }

  }

  eliminar_servicio(id_servicio : string){
    Swal.fire({
      title: '¿Estás seguro de eliminar este servicio?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio_service.eliminar_servicio(id_servicio).subscribe({
          next: (data) => {
            Swal.fire('Servicio eliminado', '', 'success');
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
              dtInstance.destroy();
              this.obtener_servicios();
            });
          }
        })
      }
    })
  }

  

}
