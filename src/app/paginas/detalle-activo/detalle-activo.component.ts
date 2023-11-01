import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activo } from 'src/app/interfaces/activo';
import { Adjuntar_informe_servicio, ServicioDeActivo } from 'src/app/interfaces/servicio';
import { ActivoService } from 'src/app/servicios/activo/activo.service';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalle-activo',
  templateUrl: './detalle-activo.component.html',
  styleUrls: ['./detalle-activo.component.css']
})
export class DetalleActivoComponent {
  id_activo: string | null = null;
  id_servicio: any = null;
  isOpen = false;
  submitted = false;
  activoData: Activo | null = null;
  ServicioData: ServicioDeActivo[] = [];

  selectedFile: File | null = null;
  imageName: string | null = null;
  imageMimeType: string | null = null;
  imageContent: string | null = null;

  constructor(private route: ActivatedRoute,private communicationService: ComunicationService,private activoService: ActivoService,private servicio_service: ServicioService,private fb: FormBuilder){}

  form_informe_servicio: FormGroup = this.fb.group({
    informe: this.fb.control(null, [Validators.required])
  });

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id_activo = params.get('id_activo');
    });
    this.obtener_activo();
    this.obtener_servicios();

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

  obtener_id_servicio(servicio: ServicioDeActivo) {
    this.id_servicio = servicio.id_servicio;
    this.submitted = false;
    this.form_informe_servicio.reset();
  }

  onFileSelectedInforme(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.imageName = file.name;
      this.imageMimeType = file.type;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageContent = e.target.result.split(',')[1];
      };
      reader.readAsDataURL(file);
    } else {
      // Si no se seleccionó un archivo, asignar valores nulos
      this.selectedFile = null;
      this.imageName = null;
      this.imageMimeType = null;
      this.imageContent = null;
    }
  }

  adjuntar_informe(){
    this.submitted = true;
    if (this.form_informe_servicio.valid){
      Swal.fire({
        title: '¿Estás seguro de adjuntar este informe?',
        showDenyButton: true,
        confirmButtonText: 'Adjuntar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          const informe_servicio: Adjuntar_informe_servicio = {
            informe_servicio: {
              name: this.imageName,
              mimeType: this.imageMimeType,
              content: this.imageContent
            }
          }

          Swal.fire({
            title: 'Cargando...',
            allowOutsideClick: false,  // Impide que el usuario cierre el diálogo haciendo clic fuera
            didOpen: () => {
              Swal.showLoading();  // Muestra el spinner
            }
          });

          this.servicio_service.adjuntar_informe(this.id_servicio, informe_servicio).subscribe({
            next: (data) => {
              Swal.close();
              Swal.fire({
                icon: 'success',
                title: 'Servicio exitoso',
                text: 'Informe adjuntado correctamente',
                allowOutsideClick: false,
                footer: `<a href="${data.url_archivo}" target="_blank">Ver informe</a>`
              }).then((result) => {
                if (result.isConfirmed) {
                  this.obtener_servicios();
                }
                this.submitted = false;
              });

            }
          }
          );
        }
      })

    }
  }

  

}
