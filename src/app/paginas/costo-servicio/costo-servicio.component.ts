import { Component } from '@angular/core';
import { ComunicationService } from 'src/app/servicios/comunication.service';

@Component({
  selector: 'app-costo-servicio',
  templateUrl: './costo-servicio.component.html',
  styleUrls: ['./costo-servicio.component.css']
})
export class CostoServicioComponent {
  isOpen = false;

  constructor(private communicationService: ComunicationService){}

  ngOnInit(){
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

}
