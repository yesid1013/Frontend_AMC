import { Component } from '@angular/core';
import { Activo } from 'src/app/interfaces/activo';
import { Usuarios } from 'src/app/interfaces/usuario';
import { ActivoService } from 'src/app/servicios/activo/activo.service';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent {
  isOpen = false;
  listaActivos: Activo[] = [];
  listaUsuarios: Usuarios[] = [];

  constructor(private communicationService: ComunicationService, private activo_service: ActivoService, private usuario_service : UsuarioService){}

  ngOnInit(){
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    this.obtener_activos();
    this.obtener_usuarios();
  }

  obtener_activos() { //Para mostrar los activos en el formulario
    this.activo_service.listar_activos().subscribe(data => {
      this.listaActivos = data;
    })
  };

  obtener_usuarios(){
    this.usuario_service.listar_usuarios().subscribe(data => {
      this.listaUsuarios = data;
    })
  }

  selectedActivoId: string = '';
  seEjecuto_ActivoSelect = false;
  onActivoSelect(event: Event) { //Para saber el id_activo seleccionado en el datalist del formulario de registro
    const selectedText = (event.target as HTMLInputElement).value;
    const selectedOption = this.listaActivos.find(activo => activo.id_primario === selectedText);

    if (selectedOption) {
      this.selectedActivoId = selectedOption.id_activo;
      this.seEjecuto_ActivoSelect = true; // Se ejecutó la función
    }
  }

  selectedUsuarioId: string = '';
  seEjecuto_UsuarioSelect = false;
  onUsuarioSelect(event: Event) { //Para saber el id_usuario seleccionado en el datalist del formulario de registro
    const selectedText = (event.target as HTMLInputElement).value;
    const selectedOption = this.listaUsuarios.find(usuario => usuario.correo === selectedText);

    if (selectedOption) {
      this.selectedUsuarioId = selectedOption.id_usuario;
      this.seEjecuto_UsuarioSelect = true; // Se ejecutó la función
      console.log(this.selectedUsuarioId);
    }
  }

}
