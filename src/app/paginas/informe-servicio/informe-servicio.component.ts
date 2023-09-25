import { Component } from '@angular/core';
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

  constructor(private communicationService: ComunicationService, private servicio_service : ServicioService) {}

  ngOnInit() {
    this.obtener_servicios_sin_informe();
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  obtener_servicios_sin_informe(){
    this.servicio_service.servicios_sin_informe().subscribe(data => {
      this.listaServicios = data
    })
  }

}
