import { Component,ElementRef, Renderer2 } from '@angular/core';
import { ComunicationService } from 'src/app/servicios/comunication.service';

@Component({ 
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private communicationService: ComunicationService){}

  toggleSidebar() {
    this.communicationService.toggleSidebar();
  }

  

}
