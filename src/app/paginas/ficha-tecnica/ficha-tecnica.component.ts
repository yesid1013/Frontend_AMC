import { Component, ViewChild } from '@angular/core';
import { Activo, Adjuntar_ficha_tecnica } from 'src/app/interfaces/activo';
import { ActivoService } from 'src/app/servicios/activo/activo.service';
import { ComunicationService } from 'src/app/servicios/comunication.service';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-ficha-tecnica',
  templateUrl: './ficha-tecnica.component.html',
  styleUrls: ['./ficha-tecnica.component.css']
})
export class FichaTecnicaComponent {
  submitted = false;
  isOpen = false;
  listaActivos: Activo[] = [];

  selectedFile: File | null = null;
  imageName: string | null = null;
  imageMimeType: string | null = null;
  imageContent: string | null = null;

  // DataTable
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  id_activo: any = null;

  constructor(private communicationService: ComunicationService, private activo_service: ActivoService, private fb: FormBuilder) { }

  form_ficha_tecnica: FormGroup = this.fb.group({
    ficha_tecnica: this.fb.control(null, [Validators.required])
  });

  ngOnInit() {
    this.obtener_activos_sin_ficha();
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

  obtener_activos_sin_ficha() {
    this.activo_service.activos_sin_ficha_tecnica().subscribe(data => {
      this.listaActivos = data;
      this.dtTrigger.next(null);
    })
  };

  obtener_id_activo(activo: any) {
    this.id_activo = activo.id_activo
  }


  adjuntar_ficha_tecnica(value: any) {
    this.submitted = true;
    if (this.form_ficha_tecnica.valid) {
      Swal.fire({
        title: '¿Estás seguro de adjuntar esta ficha tecnica?',
        showDenyButton: true,
        confirmButtonText: 'Adjuntar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          const ficha_tecnica: Adjuntar_ficha_tecnica = {
            ficha_tecnica: {
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

          this.activo_service.adjuntar_ficha_tecnica(this.id_activo, ficha_tecnica).subscribe({
            next: (data) => {
              Swal.close();
              Swal.fire({
                icon: 'success',
                title: 'Servicio exitoso',
                text: 'Ficha técnica adjuntada correctamente',
                allowOutsideClick: false,
                footer: `<a href="${data.url_archivo} target="_blank"">Ver ficha técnica</a>`
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
                    dtInstance.destroy();
                    this.obtener_activos_sin_ficha();
                  });
                }
              });

            }
          }
          );

        }
      })





    }



  }


}
