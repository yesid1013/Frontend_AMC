import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalle-activo',
  templateUrl: './detalle-activo.component.html',
  styleUrls: ['./detalle-activo.component.css']
})
export class DetalleActivoComponent {
  id_activo: string | null = null;


  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id_activo = params.get('id_activo');
    });
  }

  constructor(private route: ActivatedRoute){}

}
