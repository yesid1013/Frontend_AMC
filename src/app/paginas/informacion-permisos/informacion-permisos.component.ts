import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activo } from 'src/app/interfaces/activo';
import { Permiso, Permisos_recibidos } from 'src/app/interfaces/permiso';
import { ActivoService } from 'src/app/servicios/activo/activo.service';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';

@Component({
  selector: 'app-informacion-permisos',
  templateUrl: './informacion-permisos.component.html',
  styleUrls: ['./informacion-permisos.component.css']
})
export class InformacionPermisosComponent {
  public isTablaHistorialColapsada: boolean = false;
  public isTablaNovedadesColapsada: boolean = false;
  permisoId : string | null = null;
  permisoData: Permiso | null = null;
  activoData : Activo | null = null;
  loading: boolean = false;
  isOpen = false;

  ver_informacion_basica:number | undefined;
  ver_historial_servicios:number | undefined;
  ver_novedades:number | undefined;
  registrar_servicio:number | undefined;
  registrar_novedad:number | undefined;
  id_activo : string | undefined;

  constructor(private route: ActivatedRoute, private permisoService : PermisosService, private communicationService: ComunicationService, private activoService : ActivoService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.permisoId = params.get('id_permiso');
    });
    this.obtener_permiso();
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }
  
  public toggleTablaHistorial(): void {
    this.isTablaHistorialColapsada = !this.isTablaHistorialColapsada;
  }

  public toggleTablaNovedades(): void {
    this.isTablaNovedadesColapsada = !this.isTablaNovedadesColapsada;
  }

  obtener_permiso(){
    this.loading = true;
    this.permisoService.obtener_permiso(this.permisoId).subscribe(data => {
      this.loading = false;
      this.permisoData = data;
      this.id_activo = this.permisoData.id_activo;
      this.ver_informacion_basica = this.permisoData.ver_informacion_basica;   
      this.ver_historial_servicios = this.permisoData.ver_historial_servicios;
      this.ver_novedades = this.permisoData.ver_novedades;
      this.registrar_servicio = this.permisoData.registrar_servicio;
      this.registrar_novedad = this.registrar_novedad;

      if (this.ver_informacion_basica === 1){
        this.obtener_activo()
      }
    });
    
  }

  obtener_activo(){
    this.activoService.info_activo(this.id_activo).subscribe(data => {
      this.activoData = data;
    })
  }
  

}
