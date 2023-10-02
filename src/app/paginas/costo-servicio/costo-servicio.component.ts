import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { Adjuntar_cotizacion, Servicio } from 'src/app/interfaces/servicio';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { CostoServicioService } from 'src/app/servicios/costo_servicio/costo-servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-costo-servicio',
  templateUrl: './costo-servicio.component.html',
  styleUrls: ['./costo-servicio.component.css']
})
export class CostoServicioComponent {
  submitted = false;
  isOpen = false;
  id_servicio: any = null;
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
  
  constructor(private communicationService: ComunicationService, private costo_servicio_service : CostoServicioService,private fb: FormBuilder){}

  form_costo_servicio: FormGroup = this.fb.group({
    costo: this.fb.control(null, [Validators.required]),
    cotizacion: this.fb.control(null, [Validators.required])
  });

  ngOnInit(){
    this.obtener_servicios_sin_costo();
    this.dtOptions = {
      language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json' }
    };
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  obtener_servicios_sin_costo(){
    this.costo_servicio_service.servicios_sin_cotizacion().subscribe(data => {
      this.listaServicios = data;
      this.dtTrigger.next(null);
    })
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

  obtener_id_servicio(servicio: Servicio) {
    this.id_servicio = servicio.id_servicio;
    this.form_costo_servicio.reset();
    this.submitted = false;
  }

  adjuntar_cotizacion(value : any){
    this.submitted = true;
    if (this.form_costo_servicio.valid){
      Swal.fire({
        title: '¿Estás seguro de adjuntar esta cotización?',
        showDenyButton: true,
        confirmButtonText: 'Adjuntar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          const costo_servicio: Adjuntar_cotizacion = {
            costo : value.costo,
            documento_cotizacion: {
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

          this.costo_servicio_service.adjuntar_cotizacion(this.id_servicio, costo_servicio).subscribe({
            next: (data) => {
              Swal.close();
              Swal.fire({
                icon: 'success',
                title: 'Servicio exitoso',
                text: 'Cotización adjuntada correctamente',
                allowOutsideClick: false,
                footer: `<a href="${data.url_archivo}" target="_blank">Ver Cotización</a>`
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
                    dtInstance.destroy();
                    this.obtener_servicios_sin_costo();
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
