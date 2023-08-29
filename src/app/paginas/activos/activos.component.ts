import { Component } from '@angular/core';
import { ComunicationService } from 'src/app/servicios/comunication.service';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css']
})
export class ActivosComponent {
  isOpen = false;
  info = "xd";

  constructor(private communicationService: ComunicationService) {}

  ngOnInit() {
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  ver_mas(){
    this.info = "https://drive.google.com/uc?id=1P3BipsTduRWUSSMTG-tOH0OjgEHbGLXH&export=download";
  }


}
