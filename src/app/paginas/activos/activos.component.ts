import { Component } from '@angular/core';
import { ActivoService } from 'src/app/servicios/activo/activo.service';
import { ComunicationService } from 'src/app/servicios/comunication.service';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css']
})
export class ActivosComponent {
  isOpen = false;
  info = "xd";

  constructor(private communicationService: ComunicationService, private activo_service : ActivoService) {}

  ngOnInit() : void {
    this.listar_activos();
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  listar_activos(){
    this.activo_service.listar_activos().subscribe(data => {
      console.log(data)
    })
  }

  ver_mas(){
    this.info = "https://drive.google.com/uc?id=1P3BipsTduRWUSSMTG-tOH0OjgEHbGLXH&export=download";
  }


}
