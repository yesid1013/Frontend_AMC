import { Component,ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import Swal from 'sweetalert2';


@Component({ 
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  nombre_usuario : string | null = '';
  constructor(private communicationService: ComunicationService, private router : Router){}

  ngOnInit(){
    this.obtener_nombre_usuario();
  }

  toggleSidebar() {
    this.communicationService.toggleSidebar();
  }

  logOut(){
    Swal.fire({
      title: '¿Estas seguro de cerrar sesión?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión'
    }).then((result)=> {
      if (result.isConfirmed){
        Swal.fire({
          icon: 'success',
          title: 'Sesión finalizada',
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.removeItem('token');
        this.router.navigate(['/login'])
      }
    })
    
  }

  obtener_nombre_usuario(){
    this.nombre_usuario = localStorage.getItem('nombre')
  }

  

}
