import { Component } from '@angular/core';
import { Servicio } from 'src/app/interfaces/servicio';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {
  isOpen = false;
  listaServicios : Servicio[] = []
  constructor(private communicationService: ComunicationService,private servicio_service : ServicioService) {}

  ngOnInit() {
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    this.obtener_servicios();
  }

  obtener_servicios(){
    this.servicio_service.obtener_servicios().subscribe(data => {
      this.listaServicios = data;
    })
  }

}
