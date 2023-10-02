import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { Adjuntar_informe_servicio, Servicio } from 'src/app/interfaces/servicio';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-informe-servicio',
  templateUrl: './informe-servicio.component.html',
  styleUrls: ['./informe-servicio.component.css']
})
export class InformeServicioComponent {
  id_servicio: any = null;

  isOpen = false;
  submitted = false;
  listaServicios: Servicio[] = [];

  selectedFile: File | null = null;
  imageName: string | null = null;
  imageMimeType: string | null = null;
  imageContent: string | null = null;

  // DataTable
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  constructor(private communicationService: ComunicationService, private servicio_service : ServicioService,private fb: FormBuilder) {}

  form_informe_servicio: FormGroup = this.fb.group({
    informe: this.fb.control(null, [Validators.required])
  });

  ngOnInit() {
    this.obtener_servicios_sin_informe();
    this.dtOptions = {
      language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json' }
    };
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  onFileSelected(event: any) {
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

  obtener_servicios_sin_informe(){
    this.servicio_service.servicios_sin_informe().subscribe(data => {
      this.listaServicios = data;
      this.dtTrigger.next(null);
    })
  }

  obtener_id_servicio(servicio: Servicio) {
    this.id_servicio = servicio.id_servicio;
    this.submitted = false;
    this.form_informe_servicio.reset()
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
                  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
                    dtInstance.destroy();
                    this.obtener_servicios_sin_informe();
                  });
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
