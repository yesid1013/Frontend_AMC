import { Component, ViewChild, ElementRef } from '@angular/core';
import { Activo, Editar_activo, Registro_activo } from 'src/app/interfaces/activo';
import { ActivoService } from 'src/app/servicios/activo/activo.service';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { SubclienteService } from 'src/app/servicios/subcliente/subcliente.service';
import { Subcliente } from 'src/app/interfaces/subcliente';
import Swal from 'sweetalert2';
import { Usuarios } from 'src/app/interfaces/usuario';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { Registrar_permiso } from 'src/app/interfaces/permiso';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';
import { RegistroServicio } from 'src/app/interfaces/servicio';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { AuthGoogleService } from 'src/app/servicios/auth-google/auth-google.service';
import { error } from 'jquery';


@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css']
})
export class ActivosComponent {
  submitted = false;
  isOpen = false;
  info_codigo_qr: string = "";
  id_activo: any = null;
  selectedUsuarioId: string = '';
  seEjecuto_UsuarioSelect = false;
  listaActivos: Activo[] = [];
  listaActivosEliminados: Activo[] = [];
  listaSubclientes: Subcliente[] = [];
  listaUsuarios: Usuarios[] = [];

  selectedFile: File | null = null;

  fileName: string | null = null;
  fileMimeType: string | null = null;
  fileContent: string | null = null;

  file: any;
  refFile : any;
  rutaArchivo : any;

  // DataTable
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;


  constructor(private communicationService: ComunicationService, private activo_service: ActivoService, private fb: FormBuilder, private subclienteService: SubclienteService, private permisos_service: PermisosService, private usuario_service: UsuarioService, private servicio_service: ServicioService,private storage: Storage,private authGoogleService:  AuthGoogleService) { }



  // Formulario de registrar activo
  form_activo: FormGroup = this.fb.group({
    id_primario: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    id_secundario: this.fb.control(null, [Validators.minLength(3)]),
    ubicacion: this.fb.control(null, [Validators.required]),
    tipo_de_equipo: this.fb.control(null, [Validators.required]),
    fabricante: this.fb.control(null, [Validators.required]),
    modelo: this.fb.control(null, []),
    num_serie: this.fb.control(null, []),
    datos_relevantes: this.fb.control(null, []),
    imagen_equipo: this.fb.control(null, [Validators.required]),
    subcliente: this.fb.control(null, [Validators.required]),
    publico: this.fb.control(0, [Validators.required])
  });

  // Formulario de editar activo
  form_edit_activo: FormGroup = this.fb.group({
    id_primario: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    id_secundario: this.fb.control(null, [Validators.minLength(3)]),
    ubicacion: this.fb.control(null, [Validators.required]),
    tipo_de_equipo: this.fb.control(null, [Validators.required]),
    fabricante: this.fb.control(null, [Validators.required]),
    modelo: this.fb.control(null, []),
    num_serie: this.fb.control(null, []),
    datos_relevantes: this.fb.control(null, []),
    subcliente: this.fb.control(null, [Validators.required]),
    publico: this.fb.control(0, [Validators.required])
  });

  form_registrar_permiso: FormGroup = this.fb.group({
    usuario: this.fb.control('', [Validators.required]),
    ver_informacion_basica: this.fb.control(0, [Validators.required]),
    ver_historial_servicios: this.fb.control(0, [Validators.required]),
    ver_novedades: this.fb.control(0, [Validators.required]),
    registrar_servicio: this.fb.control(0, [Validators.required]),
    registrar_novedad: this.fb.control(0, [Validators.required]),
    ver_costo_servicio: this.fb.control(0, [Validators.required])

  });

  // Formulario de registrar servicio
  form_servicio: FormGroup = this.fb.group({
    tipo_de_servicio: this.fb.control("Seleccione tipo de servicio", [Validators.required]),
    descripcion: this.fb.control(null, [Validators.required]),
    observaciones: this.fb.control(null, []),
    observaciones_usuario: this.fb.control(null, []),
    fecha_ejecucion: this.fb.control('', [Validators.required]),
    orden_de_servicio: this.fb.control('', [])
  });

  ngOnInit(): void {
    setTimeout(() => {
      if (sessionStorage.getItem('id_token')){
        this.validateAccess();
      } else {
        this.listar_activos();
        this.listar_subclientes();
        this.obtener_usuarios();

      } 

    } , 1500);
    
    this.dtOptions = {
      language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json' }
    };
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    
  }

  validateAccess(){
    this.authGoogleService.login_google().subscribe({
      next : res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('nombre', res.nombre);
        this.listar_activos();
        this.listar_subclientes();
        this.obtener_usuarios();
      },
      error : error => {
        this.authGoogleService.logout();
      }
    })
  }



  

  rerender(): void {
    // Renderiza el DataTable nuevamente
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }

  listar_activos() {
    this.activo_service.listar_activos().subscribe(data => {
      this.listaActivos = data;
      this.dtTrigger.next(null);
    });
  };

  listar_subclientes() { //Funcion para listar los subclientes y mostrarlos en el select del formulario
    this.subclienteService.listar_subclientes().subscribe(data => {
      this.listaSubclientes = data;
    });
  }


  onFileSelected($event: any, carpeta: string) {

    this.file = $event.target.files[0];

    this.refFile = ref(this.storage, `${carpeta}${this.file.name}`);

  }


  // registrar_activo(value: any) {
  //   this.submitted = true;
  //   if (this.form_activo.valid) {

  //     uploadBytes(this.imgRef, this.file).then(x => {
  //       return this.rutaImgaen = x.ref.fullPath;
  //     }).catch(error => console.log(error));

  //     const activo: Registro_activo = {
  //       id_primario: value.id_primario,
  //       id_secundario: value.id_secundario,
  //       ubicacion: value.ubicacion,
  //       tipo_de_equipo: value.tipo_de_equipo,
  //       fabricante: value.fabricante,
  //       modelo: value.modelo,
  //       num_serie: value.num_serie,
  //       datos_relevantes: value.datos_relevantes,
  //       id_subcliente: value.subcliente,

  //       imagen_equipo: this.rutaImgaen,

  //       publico: value.publico
  //     };

      

  //     Swal.fire({
  //       title: 'Cargando...',
  //       allowOutsideClick: false,  // Impide que el usuario cierre el diálogo haciendo clic fuera
  //       didOpen: () => {
  //         Swal.showLoading();  // Muestra el spinner
  //       }
  //     });

  //     this.activo_service.registrar_activo(activo).subscribe(data => {
  //       Swal.close();
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Servicio exitoso',
  //         text: 'Activo creado correctamente',
  //         allowOutsideClick: false,

  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
  //             dtInstance.destroy();
  //             this.listar_activos();
  //           });

  //         }
  //       });
  //     });


  //   }
  // }

  registrar_activo(value: any) {
    this.submitted = true;
    if (this.form_activo.valid) {
      Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      uploadBytes(this.refFile, this.file) //Alojar imagen en firebase storage
        .then(uploadResult => {
          

          this.rutaArchivo = uploadResult.ref.fullPath; //Obtengo la ruta donde se encuentra la imagen
  
          const activo: Registro_activo = {
            id_primario: value.id_primario,
            id_secundario: value.id_secundario,
            ubicacion: value.ubicacion,
            tipo_de_equipo: value.tipo_de_equipo,
            fabricante: value.fabricante,
            modelo: value.modelo,
            num_serie: value.num_serie,
            datos_relevantes: value.datos_relevantes,
            id_subcliente: value.subcliente,
    
            imagen_equipo: this.rutaArchivo,
    
            publico: value.publico
          };
  
          
  
          // Llamada al servicio dentro del bloque then
          return this.activo_service.registrar_activo(activo).toPromise(); // Convertir Observable a Promesa
        })
        .then(data => {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Servicio exitoso',
            text: 'Activo creado correctamente',
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.listar_activos();
              });
            }
          });
        })
        .catch(error => {
          // Manejar el error aquí si es necesario
        });
    }
  }
  

  

  registrar_servicio(value : any){
    this.submitted = true;
    const fecha = new Date(value.fecha_ejecucion);
    const fechaFormateada = fecha.toISOString();
    if (this.form_servicio.valid){

      Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,  // Impide que el usuario cierre el diálogo haciendo clic fuera
        didOpen: () => {
          Swal.showLoading();  // Muestra el spinner
        }
      });

      uploadBytes(this.refFile, this.file).then(uploadResult => {
        this.rutaArchivo = uploadResult.ref.fullPath; //Obtengo la ruta donde se encuentra la imagen

        const servicio : RegistroServicio = {
          fecha_ejecucion : fechaFormateada,
          descripcion : value.descripcion,
          id_tipo_servicio: value.tipo_de_servicio,
          observaciones : value.observaciones,
          observaciones_usuario : value.observaciones_usuario,
          orden_de_servicio : this.rutaArchivo
        };

        return this.servicio_service.registrar_servicio(servicio,this.id_activo).toPromise();


      }).then(data => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Servicio creado correctamente',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {

          }
        });

      }).catch(error => {
        console.log(error)
      });

    }
  }

  imagen: boolean = false;
  set_form_edit_activo(activo: any) {

    if (activo.imagen_equipo == null) {
      this.imagen = true
    } else {
      this.imagen = false;
    }

    this.form_edit_activo.setValue({
      id_primario: activo['id_primario'],
      id_secundario: activo['id_secundario'],
      ubicacion: activo['ubicacion'],
      tipo_de_equipo: activo['tipo_de_equipo'],
      fabricante: activo['fabricante'],
      modelo: activo['modelo'],
      num_serie: activo['num_serie'],
      datos_relevantes: activo['datos_relevantes'],
      subcliente: activo['id_subcliente'],
      publico: activo['publico']
    });
    this.id_activo = activo.id_activo;

  }

  editar_activo(value: any) {
    this.submitted = true;
    if (this.id_activo) {
      if (this.form_edit_activo.valid) {
        Swal.fire({
          title: '¿Estas seguro de editar este activo?',
          showDenyButton: true,
          confirmButtonText: 'Editar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            const editar_activo: Editar_activo = {
              id_primario: value.id_primario,
              id_secundario: value.id_secundario,
              ubicacion: value.ubicacion,
              tipo_de_equipo: value.tipo_de_equipo,
              fabricante: value.fabricante,
              modelo: value.modelo,
              num_serie: value.num_serie,
              datos_relevantes: value.datos_relevantes,
              id_subcliente: value.subcliente,
              publico: value.publico,

            }

            Swal.fire({
              title: 'Cargando...',
              allowOutsideClick: false,  // Impide que el usuario cierre el diálogo haciendo clic fuera
              didOpen: () => {
                Swal.showLoading();  // Muestra el spinner
              }
            });

            this.activo_service.editar_activo(this.id_activo, editar_activo).subscribe({
              next: (data) => {
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Servicio exitoso',
                  text: 'Activo editado correctamente',
                  allowOutsideClick: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
                      dtInstance.destroy();
                      this.listar_activos();
                      this.submitted = false;
                    });

                  }
                });
              }
            })
          } else if (result.isDenied) {
            Swal.fire('Activo no editado', '', 'info')
          }
        })

      }

    }

  }

  eliminar_activo(id_activo: string) {
    Swal.fire({
      title: '¿Estas seguro de eliminar este producto?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.activo_service.eliminar_activo(id_activo).subscribe({
          next: (data) => {
            console.log(data)
            Swal.fire('Activo eliminado', '', 'success');
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
              dtInstance.destroy();
              this.listar_activos();
            });

          }
        })
      }
    })
  }

  listar_activos_eliminados() {
    this.activo_service.activos_eliminados().subscribe(data => {
      this.listaActivosEliminados = data;
    });
  };

  restaurar_activo(id_activo: string) {
    Swal.fire({
      title: '¿Quieres restaurar este activo?',
      showDenyButton: true,
      confirmButtonText: 'Restaurar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.activo_service.restaurar_activo(id_activo).subscribe(data => {
          Swal.fire('Activo restaurado', '', 'success');
        });
      }
    })
  }

  obtener_usuarios() {
    this.usuario_service.listar_usuarios().subscribe(data => {
      this.listaUsuarios = data;
    })
  }

  onUsuarioSelect(event: Event) { //Para saber el id_usuario seleccionado en el datalist del formulario de registro
    const selectedText = (event.target as HTMLInputElement).value;
    const selectedOption = this.listaUsuarios.find(usuario => usuario.correo === selectedText);

    if (selectedOption) {
      this.selectedUsuarioId = selectedOption.id_usuario;
      this.seEjecuto_UsuarioSelect = true; // Se ejecutó la función
    }
  }

  obtener_id_activo(activo: Activo) {
    this.id_activo = activo.id_activo;
  }

  registrar_permiso(value: any) {
    this.submitted = true;
    if (this.form_registrar_permiso.valid) {
      Swal.fire({
        title: '¿Estas seguro de compartir este activo?',
        showDenyButton: true,
        confirmButtonText: 'Compartir',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          const permiso: Registrar_permiso = {
            id_activo: this.id_activo,
            id_usuario: this.selectedUsuarioId,
            ver_informacion_basica: value.ver_informacion_basica,
            ver_historial_servicios: value.ver_historial_servicios,
            ver_novedades: value.ver_novedades,
            registrar_servicio: value.registrar_servicio,
            registrar_novedad: value.registrar_novedad,
            ver_costo_servicio: value.ver_costo_servicio

          }

          this.permisos_service.registrar_permiso(permiso).subscribe(data => {
            this.submitted = false;
            Swal.fire({
              icon: 'success',
              title: 'Registro exitoso',
              text: 'Permiso creado correctamente',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
                  dtInstance.destroy();
                  this.listar_activos();
                });
              }
            });
          })

        }

      })

    }

  }

  ajustarVerCosto() {
    const verHistorialServicios = this.form_registrar_permiso.get('ver_historial_servicios')?.value;

    // Si ver_historial_servicios es "No", establecer ver_costo_servicio en "No"
    if (verHistorialServicios === 0) {
      this.form_registrar_permiso.get('ver_costo_servicio')?.setValue(0);
    }
  }


}
