import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComunicationService } from 'src/app/servicios/comunication.service';


@Component({
  selector: 'app-detalle-activo',
  templateUrl: './detalle-activo.component.html',
  styleUrls: ['./detalle-activo.component.css']
})
export class DetalleActivoComponent {
  id_activo: string | null = null;
  isOpen = false;

  constructor(private route: ActivatedRoute,private communicationService: ComunicationService){}


  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id_activo = params.get('id_activo');
    });

    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  

}
