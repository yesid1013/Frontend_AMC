import { Component,OnInit  } from '@angular/core';
import { ComunicationService } from 'src/app/servicios/comunication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isOpen = false;

  constructor(private communicationService:ComunicationService){}

  ngOnInit() {
    this.communicationService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

}
