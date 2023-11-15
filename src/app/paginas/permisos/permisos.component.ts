import { Component, ViewChild } from '@angular/core';
import { Activo } from 'src/app/interfaces/activo';
import { Usuarios } from 'src/app/interfaces/usuario';
import { ActivoService } from 'src/app/servicios/activo/activo.service';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { Editar_permiso, PermisosDeActivo, Permisos_creados, Registrar_permiso } from 'src/app/interfaces/permiso';
import Swal from 'sweetalert2';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent {
  id_permiso: any = null;
  id_activo: any = null;
  edit_activo_id : string = "";
  edit_usuario_id : string = "";
  selectedActivoId: string = '';
  selectedUsuarioId: string = '';
  seEjecuto_UsuarioSelect = false;
  seEjecuto_ActivoSelect = false;
  isOpen = false;
  listaActivos: Activo[] = [];
  listaUsuarios: Usuarios[] = [];
  listaPermisosCreados: Permisos_creados[] = [];
  listaPermisosDeActivo: PermisosDeActivo[] = []
  submitted = false;

  // DataTable
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;



  constructor(private communicationService: ComunicationService, private activo_service: ActivoService, private usuario_service : UsuarioService,private fb: FormBuilder, private permisos_service : PermisosService,private route: ActivatedRoute){}

  form_registrar_permiso: FormGroup = this.fb.group({
    activo: this.fb.control('', [Validators.required]),
    usuario: this.fb.control('', [Validators.required]),
    ver_informacion_basica: this.fb.control(0,[Validators.required]),
    ver_historial_servicios: this.fb.control(0,[Validators.required]),
    ver_novedades: this.fb.control(0,[Validators.required]),
    registrar_servicio: this.fb.control(0,[Validators.required]),
    registrar_novedad: this.fb.control(0,[Validators.required])
  });

  form_editar_permiso: FormGroup = this.fb.group({
    usuario: this.fb.control('', [Validators.required]),
    ver_informacion_basica: this.fb.control(0,[Validators.required]),
    ver_historial_servicios: this.fb.control(0,[Validators.required]),
    ver_novedades: this.fb.control(0,[Validators.required]),
    registrar_servicio: this.fb.control(0,[Validators.required]),
    registrar_novedad: this.fb.control(0,[Validators.required]),
    ver_costo_servicio: this.fb.control(0,[Validators.required])
  });

  

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id_activo = params.get('id_activo');
    });
    this.obtener_permisos_de_activo();
    this.obtener_usuarios();
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    this.dtOptions = {
      language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json' }
    };
  }

  obtener_permisos_de_activo(){
    this.permisos_service.permisos_de_activo(this.id_activo).subscribe(data => {
      this.listaPermisosDeActivo = data;
      this.dtTrigger.next(null);
    })
  }

  obtener_activos() { //Para mostrar los activos en el formulario
    this.activo_service.listar_activos().subscribe(data => {
      this.listaActivos = data;
    })
  };

  obtener_usuarios(){
    this.usuario_service.listar_usuarios().subscribe(data => {
      this.listaUsuarios = data;
    })
  }

  obtener_permisos_creados(){
    this.permisos_service.permisos_creados().subscribe(data => {
      if (data == null){
      } else {
        this.listaPermisosCreados = data;
        this.dtTrigger.next(null);
      }
      
    })
  }

  
  set_form_edit_permisos(permiso : PermisosDeActivo){

    const selectedOptionUsuario = this.listaUsuarios.find(usuario => usuario.correo === permiso.usuario_correo);
    if (selectedOptionUsuario) {
      this.edit_usuario_id = selectedOptionUsuario.id_usuario;
    }

    this.form_editar_permiso.setValue({
      usuario : permiso.usuario_correo,
      ver_informacion_basica : permiso.ver_informacion_basica,
      ver_historial_servicios : permiso.ver_historial_servicios,
      ver_novedades : permiso.ver_novedades,
      registrar_servicio : permiso.registrar_servicio,
      registrar_novedad : permiso.registrar_novedad,
      ver_costo_servicio : permiso.ver_costo_servicio
    })

    this.id_permiso = permiso.id_permiso;

  }

  
  onActivoSelect(event: Event) { //Para saber el id_activo seleccionado en el datalist del formulario de registro
    const selectedText = (event.target as HTMLInputElement).value;
    const selectedOption = this.listaActivos.find(activo => activo.id_primario === selectedText);

    if (selectedOption) {
      this.selectedActivoId = selectedOption.id_activo;
      this.seEjecuto_ActivoSelect = true; // Se ejecutó la función
    }
  }

  
  onUsuarioSelect(event: Event) { //Para saber el id_usuario seleccionado en el datalist del formulario de registro
    const selectedText = (event.target as HTMLInputElement).value;
    const selectedOption = this.listaUsuarios.find(usuario => usuario.correo === selectedText);

    if (selectedOption) {
      this.selectedUsuarioId = selectedOption.id_usuario;
      this.seEjecuto_UsuarioSelect = true; // Se ejecutó la función
    }
  }

  registrar_permiso(value : any){
    this.submitted = true;
    if(this.form_registrar_permiso.valid){
      const permiso : Registrar_permiso = {
        id_activo : this.selectedActivoId,
        id_usuario : this.selectedUsuarioId,
        ver_informacion_basica : value.ver_informacion_basica,
        ver_historial_servicios : value.ver_historial_servicios,
        ver_novedades : value.ver_novedades,
        registrar_servicio : value.registrar_servicio,
        registrar_novedad : value.registrar_novedad,
        ver_costo_servicio : 1
      }

      this.permisos_service.registrar_permiso(permiso).subscribe(data => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Permiso creado correctamente',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.obtener_permisos_creados();
          }
        });
      })
      
    }

  }

  editar_permiso(value : any){
    if(this.id_permiso){
      if(this.form_editar_permiso.valid){
        Swal.fire({
          title: '¿Estas seguro de editar este permiso?',
          showDenyButton: true,
          confirmButtonText: 'Editar',
          denyButtonText: `Cancelar`,
        }).then((result => {
          if (result.isConfirmed){
            if(this.seEjecuto_UsuarioSelect){
              this.edit_usuario_id = this.selectedUsuarioId;
            }

            const editar_permiso : Editar_permiso ={
              id_usuario : this.edit_usuario_id,
              ver_informacion_basica : value.ver_informacion_basica,
              ver_historial_servicios : value.ver_historial_servicios,
              ver_novedades : value.ver_novedades,
              ver_costo_servicio : value.ver_costo_servicio,
              registrar_servicio : value.registrar_servicio,
              registrar_novedad : value.registrar_novedad
            }

            this.permisos_service.editar_permiso(this.id_permiso,editar_permiso).subscribe(data =>{
              Swal.fire({
                icon: 'success',
                title: 'Edición exitosa',
                text: 'Permiso editado correctamente',
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
                    dtInstance.destroy();
                    this.obtener_permisos_de_activo();
                  });
                  this.seEjecuto_UsuarioSelect = false;
                }
              });
            })
            

          }
        }))
      }
    }

  }

  eliminar_permiso(id_permiso : string){
    Swal.fire({
      title: '¿Estás seguro de eliminar este permiso?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.permisos_service.eliminar_permiso(id_permiso).subscribe({
          next: (data) => {
            Swal.fire('Permiso eliminado', '', 'success');
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
              dtInstance.destroy();
              this.obtener_permisos_de_activo();
            });
            
          }
        })
      }
    })
  }

  ajustarVerCosto() {
    const verHistorialServicios = this.form_editar_permiso.get('ver_historial_servicios')?.value;
  
    // Si ver_historial_servicios es "No", establecer ver_costo_servicio en "No"
    if (verHistorialServicios === 0) {
      this.form_editar_permiso.get('ver_costo_servicio')?.setValue(0);
    }
  }

}
