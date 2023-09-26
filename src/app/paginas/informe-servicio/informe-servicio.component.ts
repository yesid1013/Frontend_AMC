import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { Servicio } from 'src/app/interfaces/servicio';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';

@Component({
  selector: 'app-informe-servicio',
  templateUrl: './informe-servicio.component.html',
  styleUrls: ['./informe-servicio.component.css']
})
export class InformeServicioComponent {
  isOpen = false;
  listaServicios: Servicio[] = [];

  // DataTable
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  constructor(private communicationService: ComunicationService, private servicio_service : ServicioService) {}

  ngOnInit() {
    this.obtener_servicios_sin_informe();
    this.dtOptions = {
      language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json' }
    };
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  obtener_servicios_sin_informe(){
    this.servicio_service.servicios_sin_informe().subscribe(data => {
      this.listaServicios = data;
    })
  }

}
