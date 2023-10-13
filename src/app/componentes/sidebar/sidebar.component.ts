import { Component,OnInit  } from '@angular/core';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isOpen = false;
  token : string | null = '';
  nombre_usuario : string | null = '';

  constructor(private communicationService:ComunicationService,private route: ActivatedRoute){}
  

  ngOnInit() {
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    this.obtener_nombre_usuario()
  }

  obtener_nombre_usuario(){
    this.nombre_usuario = localStorage.getItem('nombre')
  }



  activeColor: string = '#009CFF';
  backgroundColor: string = '#FFFFFF';
  borderColor: string = '#009CFF';

}
