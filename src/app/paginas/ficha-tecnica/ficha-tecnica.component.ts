import { Component } from '@angular/core';
import { ComunicationService } from 'src/app/servicios/comunication.service';

@Component({
  selector: 'app-ficha-tecnica',
  templateUrl: './ficha-tecnica.component.html',
  styleUrls: ['./ficha-tecnica.component.css']
})
export class FichaTecnicaComponent {
  isOpen = false;
  constructor(private communicationService: ComunicationService) {}

  ngOnInit() {
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

}
 