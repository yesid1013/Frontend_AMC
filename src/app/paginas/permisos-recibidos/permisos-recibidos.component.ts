import { Component } from '@angular/core';
import { ComunicationService } from 'src/app/servicios/comunication.service';

@Component({
  selector: 'app-permisos-recibidos',
  templateUrl: './permisos-recibidos.component.html',
  styleUrls: ['./permisos-recibidos.component.css']
})
export class PermisosRecibidosComponent {
  isOpen = false;

  constructor(private communicationService: ComunicationService){}

  ngOnInit(){
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

}
