import { Component,ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/servicios/auth-google/auth-google.service';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import Swal from 'sweetalert2';


@Component({ 
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  nombre_usuario : string | null = '';
  constructor(private communicationService: ComunicationService, private router : Router,private authGoogleService:  AuthGoogleService){}

  ngOnInit(){
    this.obtener_nombre_usuario();
  }

  toggleSidebar() {
    this.communicationService.toggleSidebar();
  }

  logOut(){
    Swal.fire({
      title: '¿Estás seguro de cerrar sesión?',
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText : 'No'
    }).then((result)=> {
      if (result.isConfirmed){
        if (sessionStorage.getItem('id_token')){
          this.authGoogleService.logout();
        }
        localStorage.removeItem('token');
        localStorage.removeItem('nombre');
        this.router.navigate(['/login'])
        Swal.fire({
          icon: 'success',
          title: 'Sesión finalizada',
          showConfirmButton: false,
          timer: 1500
        });
        
        
        
      }
    })
    
  }

  obtener_nombre_usuario(){
    this.nombre_usuario = localStorage.getItem('nombre')
  }

  

}
