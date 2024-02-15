import { Component, QueryList, ViewChild,ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activo } from 'src/app/interfaces/activo';
import { Permiso, Permisos_recibidos } from 'src/app/interfaces/permiso';
import { ActivoService } from 'src/app/servicios/activo/activo.service';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegistroServicio, ServicioDeActivo, ServiciosDeActivoSinCosto } from 'src/app/interfaces/servicio';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';
import { Novedad, Registro_novedad } from 'src/app/interfaces/novedad';
import { NovedadService } from 'src/app/servicios/novedad/novedad.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';




@Component({
  selector: 'app-informacion-permisos',
  templateUrl: './informacion-permisos.component.html',
  styleUrls: ['./informacion-permisos.component.css']
})
export class InformacionPermisosComponent {
  public isTablaHistorialColapsada: boolean = false;
  public isTablaNovedadesColapsada: boolean = false;
  permisoId: string | null = null;
  permisoData: Permiso | null = null;
  ServicioData: ServicioDeActivo[] = [];
  ServicioSinCostoData: ServiciosDeActivoSinCosto[] = [];
  NovedadData: Novedad[] = [];
  activoData: Activo | null = null;
  loading: boolean = false;
  isOpen = false;
  submitted = false;

  ver_informacion_basica: number | undefined;
  ver_historial_servicios: number | undefined;
  ver_novedades: number | undefined;
  ver_costo_servicio: number | undefined;
  registrar_servicio: number | undefined;
  registrar_novedad: number | undefined;
  id_activo: string = '';

  imagenActivo: any;

  selectedFile: File | null = null;
  fileName: string | null = null;
  fileMimeType: string | null = null;
  fileContent: string | null = null;

  // Formulario de registrar servicio
  form_servicio: FormGroup = this.fb.group({
    tipo_de_servicio: this.fb.control(null, [Validators.required]),
    descripcion: this.fb.control(null, [Validators.required]),
    observaciones: this.fb.control(null, []),
    observaciones_usuario: this.fb.control(null, []),
    fecha_ejecucion: this.fb.control('', [Validators.required]),
    orden_de_servicio: this.fb.control('', [])
  });
  // Formulario de registrar novedad
  form_novedad: FormGroup = this.fb.group({
    nombre_reporta: this.fb.control(null, [Validators.required]),
    nombre_empresa: this.fb.control(null, [Validators.required]),
    cargo: this.fb.control(null, [Validators.required]),
    descripcion_reporte: this.fb.control(null, [Validators.required]),
    imagenes: this.fb.control('', [])
  });

  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();

  constructor(private route: ActivatedRoute, private permisoService: PermisosService, private communicationService: ComunicationService, private activoService: ActivoService, private fb: FormBuilder, private servicio_service: ServicioService, private novedad_service: NovedadService, private storage : Storage) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.permisoId = params.get('id_permiso');
    });

    this.obtener_permiso();

    this.dtOptions = {
      language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json' }
    };

    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  rerender(rerender_novedad : boolean, rerender_servicio : boolean) { //Lo parametros de esta funcion son para saber que tabla se debe renderizar, se mandan desde las funcione de crear
    
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance)
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
    });
    setTimeout(() => {
      if (rerender_novedad == true){
        this.obtener_novedades()
      }
      if (rerender_servicio == true){
        if (this.ver_historial_servicios === 1 && this.ver_costo_servicio === 0) { //Si tiene permisos de ver historial de servicios pero no de costo, se llama a la funcion que obtiene solo los servicios
          this.obtener_servicios_sin_costo();
        } else {
          this.obtener_servicios();
        }
      }
    });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();
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

  public toggleTablaHistorial(): void {
    this.isTablaHistorialColapsada = !this.isTablaHistorialColapsada;
  }

  public toggleTablaNovedades(): void {
    this.isTablaNovedadesColapsada = !this.isTablaNovedadesColapsada;
  }

  obtener_permiso() {
    this.loading = true;
    this.permisoService.obtener_permiso(this.permisoId).subscribe(data => {
      this.loading = false;
      this.permisoData = data;
      this.id_activo = this.permisoData.id_activo;
      this.ver_informacion_basica = this.permisoData.ver_informacion_basica;
      this.ver_historial_servicios = this.permisoData.ver_historial_servicios;
      this.ver_novedades = this.permisoData.ver_novedades;
      this.ver_costo_servicio = this.permisoData.ver_costo_servicio;
      this.registrar_servicio = this.permisoData.registrar_servicio;
      this.registrar_novedad = this.permisoData.registrar_novedad;

      if (this.ver_informacion_basica === 1) { // si tiene permisos de ver informaciom basica, llamo la funcion para obtener la informacion de ese activo
        this.obtener_activo();
      }

      if (this.ver_historial_servicios === 1 && this.ver_costo_servicio === 0) { //Si tiene permisos de ver historial de servicios pero no de costo, se llama a la funcion que obtiene solo los servicios
        this.obtener_servicios_sin_costo();
      }

      if (this.ver_historial_servicios === 1 && this.ver_costo_servicio === 1) { //Si tiene permisos de ver historial de servicios y de costo, se llama a la funcion que obtiene los servicios con el costo
        this.obtener_servicios();
      }

      if (this.ver_novedades === 1) {
        this.obtener_novedades();
      }
    });

  }

  obtener_activo() {
    this.activoService.info_activo(this.id_activo).subscribe(data => {
      this.activoData = data;
      this.mostrarImagenActivo()
    })
  }

  mostrarImagenActivo() { //Mostrar imagen alojada en firebase
    if (this.activoData && this.activoData.imagen_equipo) {
      const storageRef = ref(this.storage, this.activoData.imagen_equipo);

      // Obtener la URL de descarga
      getDownloadURL(storageRef).then(url => {
        this.imagenActivo = url;
      }).catch(error => {
        console.error('Error al obtener la URL de la imagen:', error);
      });
    }
  }



  crear_servicio(value: any) {
    this.submitted = true;
    if (this.registrar_servicio === 1) {
      if (this.form_servicio.valid) {
        const fecha = new Date(value.fecha_ejecucion);
        const fechaFormateada = fecha.toISOString();

        const servicio: RegistroServicio = {
          fecha_ejecucion: fechaFormateada,
          descripcion: value.descripcion,
          id_tipo_servicio: value.tipo_de_servicio,
          observaciones: value.observaciones,
          observaciones_usuario: value.observaciones_usuario,

          orden_de_servicio: ""
        };

        Swal.fire({
          title: 'Cargando...',
          allowOutsideClick: false,  // Impide que el usuario cierre el diálogo haciendo clic fuera
          didOpen: () => {
            Swal.showLoading();  // Muestra el spinner
          }
        });

        this.servicio_service.registrar_servicio(servicio, this.id_activo).subscribe(data => {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Servicio creado correctamente',
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.submitted = false;
              this.rerender(false,true)

            }
          });
        });
      }

    }

  }

  obtener_servicios() { //obtiene el historial de servicios del activo con el costo
    this.servicio_service.obtener_servicio(this.id_activo).subscribe(data => {
      this.ServicioData = data;
      this.dtTrigger.next(null);
    })
  }

  verDocumento(rutaArchivo : string){
    if(rutaArchivo){
      const storageRef = ref(this.storage, rutaArchivo);
      // Obtener la URL de descarga
      getDownloadURL(storageRef).then(url => {
        window.open(url, '_blank')
      }).catch(error => {
        console.error('Error al obtener la URL de la imagen:', error);
      });

    }
  }

  obtener_servicios_sin_costo() { //obtiene el historial de servicios del activo sin el costo
    this.servicio_service.obtener_servicio_sin_costo(this.id_activo).subscribe(data => {
      this.ServicioSinCostoData = data;
      this.dtTrigger.next(null);
    })
  }

  crear_novedad(value: any) {
    this.submitted = true;
    if (this.registrar_novedad === 1) {
      if (this.form_novedad.valid) {
        const novedad: Registro_novedad = {
          nombre_reporta: value.nombre_reporta,
          nombre_empresa: value.nombre_empresa,
          cargo: value.cargo,
          descripcion_reporte: value.descripcion_reporte,

          imagenes: {
            name: this.fileName,
            content: this.fileContent,
            mimeType: this.fileMimeType
          }
        }

        Swal.fire({
          title: 'Cargando...',
          allowOutsideClick: false,  // Impide que el usuario cierre el diálogo haciendo clic fuera
          didOpen: () => {
            Swal.showLoading();  // Muestra el spinner
          }
        });

        this.novedad_service.registrar_novedad(novedad, this.id_activo).subscribe(data => {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Novedad creada correctamente',
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.submitted = false;
              this.rerender(true,false);
            }
          });

        })


      }
    }
  }

  obtener_novedades() {
    this.novedad_service.novedades_de_un_activo(this.id_activo).subscribe(data => {
      if (data != null) {
        this.NovedadData = data;
        this.dtTrigger2.next(null);
      }
    })
  }



}
