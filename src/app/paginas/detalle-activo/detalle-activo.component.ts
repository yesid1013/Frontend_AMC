import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activo } from 'src/app/interfaces/activo';
import { ServicioDeActivo } from 'src/app/interfaces/servicio';
import { ActivoService } from 'src/app/servicios/activo/activo.service';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';


@Component({
  selector: 'app-detalle-activo',
  templateUrl: './detalle-activo.component.html',
  styleUrls: ['./detalle-activo.component.css']
})
export class DetalleActivoComponent {
  id_activo: string | null = null;
  isOpen = false;
  activoData: Activo | null = null;
  ServicioData: ServicioDeActivo[] = [];

  constructor(private route: ActivatedRoute,private communicationService: ComunicationService,private activoService: ActivoService,private servicio_service: ServicioService){}


  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id_activo = params.get('id_activo');
    });
    this.obtener_activo();
    this.obtener_servicios()

    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  obtener_activo() {
    this.activoService.info_activo(this.id_activo).subscribe(data => {
      this.activoData = data;
    })
  }

  obtener_servicios() { //obtiene el historial de servicios del activo
    this.servicio_service.obtener_servicio(this.id_activo).subscribe(data => {
      this.ServicioData = data;
    })

  }

  

}
