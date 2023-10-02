import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { Servicio } from 'src/app/interfaces/servicio';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { CostoServicioService } from 'src/app/servicios/costo_servicio/costo-servicio.service';

@Component({
  selector: 'app-costo-servicio',
  templateUrl: './costo-servicio.component.html',
  styleUrls: ['./costo-servicio.component.css']
})
export class CostoServicioComponent {
  isOpen = false;
  listaServicios: Servicio[] = [];

  // DataTable
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  
  constructor(private communicationService: ComunicationService, private costo_servicio_servie : CostoServicioService){}

  ngOnInit(){
    this.obtener_servicios_sin_costo();
    this.dtOptions = {
      language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json' }
    };
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  obtener_servicios_sin_costo(){
    this.costo_servicio_servie.servicios_sin_cotizacion().subscribe(data => {
      this.listaServicios = data;
      this.dtTrigger.next(null);
    })
  }

}
