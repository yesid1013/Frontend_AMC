import { Component,OnInit  } from '@angular/core';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isOpen = false;
  token : string | null = '';

  constructor(private communicationService:ComunicationService){}
  

  ngOnInit() {
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    this.obtener_rol();
  }

  obtener_rol(){
    this.token = localStorage.getItem('token');
    if (this.token){
      const decodedToken: any = jwt_decode(this.token);
      const rol = decodedToken?.perfil;
      return  rol
    }
    
  }

}
