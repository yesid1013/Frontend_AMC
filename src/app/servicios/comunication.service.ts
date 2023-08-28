import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {
  private sidebarOpenSubject = new BehaviorSubject<boolean>(false);
  sidebarOpen$: Observable<boolean> = this.sidebarOpenSubject.asObservable();

  toggleSidebar() {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }

  constructor() { }
}
