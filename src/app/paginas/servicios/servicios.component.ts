import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { Servicio } from 'src/app/interfaces/servicio';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {
  isOpen = false;
  listaServicios : Servicio[] = []

  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  token : string | null = '';
  
  constructor(private communicationService: ComunicationService,private servicio_service : ServicioService) {}

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

  obtener_servicios(){
    this.servicio_service.obtener_servicios().subscribe(data => {
      this.listaServicios = data;
      this.dtTrigger.next(null);
    })
  }

  obtener_rol(){
    this.token = localStorage.getItem('token');
    if (this.token){
      const decodedToken: any = jwt_decode(this.token);
      const rol = decodedToken?.perfil;
      return  rol
    }
    
  }

}
