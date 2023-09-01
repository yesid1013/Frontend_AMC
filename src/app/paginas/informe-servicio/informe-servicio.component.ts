import { Component } from '@angular/core';
import { ComunicationService } from 'src/app/servicios/comunication.service';

@Component({
  selector: 'app-informe-servicio',
  templateUrl: './informe-servicio.component.html',
  styleUrls: ['./informe-servicio.component.css']
})
export class InformeServicioComponent {
  isOpen = false;
  constructor(private communicationService: ComunicationService) {}

  ngOnInit() {
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

}
