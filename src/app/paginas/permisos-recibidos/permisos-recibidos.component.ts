import { Component } from '@angular/core';
import { Permisos_recibidos } from 'src/app/interfaces/permiso';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';

@Component({
  selector: 'app-permisos-recibidos',
  templateUrl: './permisos-recibidos.component.html',
  styleUrls: ['./permisos-recibidos.component.css']
})
export class PermisosRecibidosComponent {
  isOpen = false;
  lista_permisos_recibidos : Permisos_recibidos[] = []
  activosFiltrados: any[] = [];

  constructor(private communicationService: ComunicationService,private permisos_service : PermisosService){}

  ngOnInit(){
    this.obtener_permisos_recibidos()
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  filtrarActivos(event: any) {
    const filtro = event.target.value.toLowerCase();
    this.activosFiltrados = this.lista_permisos_recibidos.filter(permiso =>
      permiso.activo_tipo_de_equipo.toLowerCase().includes(filtro)
    );
  }

  obtener_permisos_recibidos(){
    this.permisos_service.permisos_recibidos().subscribe(data => {
      this.lista_permisos_recibidos = data;
    })
  }

}
