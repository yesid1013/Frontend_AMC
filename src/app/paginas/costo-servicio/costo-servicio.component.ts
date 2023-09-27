import { Component } from '@angular/core';
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

  constructor(private communicationService: ComunicationService, private costo_servicio_servie : CostoServicioService){}

  ngOnInit(){
    this.obtener_servicios_sin_costo();
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  obtener_servicios_sin_costo(){
    this.costo_servicio_servie.servicios_sin_cotizacion().subscribe(data => {
      this.listaServicios = data;
    })
  }

}
