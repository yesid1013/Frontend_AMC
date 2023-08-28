import { Component } from '@angular/core';
import { ComunicationService } from 'src/app/servicios/comunication.service';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css']
})
export class ActivosComponent {
  isOpen = false;

  constructor(private communicationService: ComunicationService) {}

  ngOnInit() {
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }


}
