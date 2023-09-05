import { Component,ViewChild } from '@angular/core';
import { Activo } from 'src/app/interfaces/activo';
import { ActivoService } from 'src/app/servicios/activo/activo.service';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { SubclienteService } from 'src/app/servicios/subcliente/subcliente.service';
import { Subcliente } from 'src/app/interfaces/subcliente';


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
  listaActivos : Activo[] = [];
  listaSubclientes : Subcliente[] = [];

  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject;
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  constructor(private communicationService: ComunicationService, private activo_service : ActivoService,private fb: FormBuilder, private subclienteService:SubclienteService) {}

  // Formulario de login
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

  registrar_activo(value : any){ 
    this.submitted = true;
    if (this.form_activo.valid){
      

      /*this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
        dtInstance.destroy();
        this.listar_activos();
      }); */
    }
  }


}
