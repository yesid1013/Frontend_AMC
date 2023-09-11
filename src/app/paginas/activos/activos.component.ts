import { Component,ViewChild } from '@angular/core';
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
import { data } from 'jquery';


@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css']
})
export class ActivosComponent {
  submitted = false;
  isOpen = false;
  info_subcliente : string = "";
  info_modelo : string = "";
  info_fabricante : string = "";
  info_num_serie : string = "";
  info_datos_relevantes : string = "";
  info_ubicacion : string = "";
  info_imagen : string = "";
  info_ficha_tecnica : string = ""
  info_codigo_qr : string = "";
  id_activo : any = null;
  listaActivos : Activo[] = [];
  listaSubclientes : Subcliente[] = [];

  selectedFile: File | null = null;
  imageName: string = '';
  imageMimeType: string = '';
  imageContent: string = '';

  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject;
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  constructor(private communicationService: ComunicationService, private activo_service : ActivoService,private fb: FormBuilder, private subclienteService:SubclienteService) {}

  // Formulario de registrar activo
  form_activo: FormGroup = this.fb.group({
    id_primario: this.fb.control('', [Validators.required,Validators.minLength(3)]),
    id_secundario: this.fb.control(null, [Validators.minLength(3)]),
    ubicacion: this.fb.control(null, [Validators.required]),
    tipo_de_equipo : this.fb.control(null, [Validators.required]),
    fabricante : this.fb.control(null, [Validators.required]),
    modelo : this.fb.control(null, []),
    num_serie : this.fb.control(null,[]),
    datos_relevantes: this.fb.control(null,[]),
    imagen_equipo: this.fb.control(null),
    subcliente :this.fb.control(null, [Validators.required])
  });

  // Formulario de editar activo
  form_edit_activo: FormGroup = this.fb.group({
    id_primario: this.fb.control('', [Validators.required,Validators.minLength(3)]),
    id_secundario: this.fb.control(null, [Validators.minLength(3)]),
    ubicacion: this.fb.control(null, [Validators.required]),
    tipo_de_equipo : this.fb.control(null, [Validators.required]),
    fabricante : this.fb.control(null, [Validators.required]),
    modelo : this.fb.control(null, []),
    num_serie : this.fb.control(null,[]),
    datos_relevantes: this.fb.control(null,[]),
    subcliente :this.fb.control(null, [Validators.required])
  });

  ngOnInit() : void {
    this.listar_activos();
    this.dtOptions = {
      language:{url:'//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'}      
    };
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    this.listar_subclientes();
  }

  listar_activos(){
    this.activo_service.listar_activos().subscribe(data => {
      this.listaActivos = data;
      this.dtTrigger.next(null);
    });
  };

  listar_subclientes(){ //Funcion para listar los subclientes y mostrarlos en el select del formulario
    this.subclienteService.listar_subclientes().subscribe(data => {
      this.listaSubclientes = data;
      });
  }

  ver_mas(subcliente : string, modelo : string, fabricante : string, num_serie : string, datos_relevantes : string, ubicacion : string, imagen : string, ficha_tecnica : string, codigo_qr : string){
    this.info_imagen = imagen;
    this.info_subcliente = subcliente;
    this.info_modelo = modelo;
    this.info_fabricante = fabricante;
    this.info_num_serie = num_serie;
    this.info_datos_relevantes = datos_relevantes;
    this.info_ubicacion = ubicacion;
    this.info_ficha_tecnica = ficha_tecnica;
    this.info_codigo_qr = codigo_qr;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      this.selectedFile = file;
      this.imageName = file.name;
      this.imageMimeType = file.type;
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageContent = e.target.result.split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }

  
  registrar_activo(value : any){ 
    this.submitted = true;
    if (this.form_activo.valid){

      const activo : Registro_activo  = {
        id_primario : value.id_primario,
        id_secundario : value.id_secundario,
        ubicacion : value.ubicacion,
        tipo_de_equipo : value.tipo_de_equipo,
        fabricante : value.fabricante,
        modelo : value.modelo,
        num_serie : value.num_serie,
        datos_relevantes : value.datos_relevantes,
        id_subcliente : value.subcliente,

        imagen_equipo: {
          name: this.imageName,
          mimeType: this.imageMimeType,
          content: this.imageContent
        }
      };

       Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,  // Impide que el usuario cierre el diálogo haciendo clic fuera
        didOpen: () => {
          Swal.showLoading();  // Muestra el spinner
        }
      });
      
      this.activo_service.registrar_activo(activo).subscribe(data => {
        Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Servicio exitoso',
            text: 'Activo creado correctamente',
            allowOutsideClick : false,
            
          }).then((result) => {
            if (result.isConfirmed) {
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
                dtInstance.destroy();
                this.listar_activos();
              });
              
            }
          });
      });
      

    }
  }

  set_form_edit_activo(activo : any){
    this.form_edit_activo.setValue({
      id_primario : activo['id_primario'],
      id_secundario : activo['id_secundario'],
      ubicacion : activo['ubicacion'],
      tipo_de_equipo : activo['tipo_de_equipo'],
      fabricante : activo['fabricante'],
      modelo : activo['modelo'],
      num_serie : activo['num_serie'],
      datos_relevantes : activo['datos_relevantes'],
      subcliente :activo['id_subcliente']
      
    });
    this.id_activo = activo.id_activo;

  }

  editar_activo(value : any){
    this.submitted = true;
    if (this.id_activo) {
      if (this.form_edit_activo.valid){
        Swal.fire({
          title: '¿Estas seguro de editar este activo?',
          showDenyButton: true,
          confirmButtonText: 'Editar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed){
            const editar_activo : Editar_activo = {
              id_primario : value.id_primario,
              id_secundario : value.id_secundario,
              ubicacion : value.ubicacion,
              tipo_de_equipo : value.tipo_de_equipo,
              fabricante : value.fabricante,
              modelo : value.modelo,
              num_serie : value.num_serie,
              datos_relevantes : value.datos_relevantes,
              id_subcliente : value.subcliente
            }
            this.activo_service.editar_activo(this.id_activo,editar_activo).subscribe({
              next : (data) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Servicio exitoso',
                  text: 'Activo editado correctamente',
                  allowOutsideClick : false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
                      dtInstance.destroy();
                      this.listar_activos();
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


}
