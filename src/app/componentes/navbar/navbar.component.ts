import { Component,ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicationService } from 'src/app/servicios/comunication.service';

@Component({ 
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private communicationService: ComunicationService, private router : Router){}

  toggleSidebar() {
    this.communicationService.toggleSidebar();
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])

  }

  

}
