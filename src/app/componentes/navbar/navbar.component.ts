import { Component,ElementRef, Renderer2 } from '@angular/core';

@Component({ 
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private elementRef: ElementRef, private renderer: Renderer2){}

  onSidebarToggle() {
    const sidebar = this.elementRef.nativeElement.querySelector('.sidebar');
    const content = this.elementRef.nativeElement.querySelector('.content');

    this.renderer.addClass(sidebar, 'open');
    this.renderer.addClass(content, 'open');
  }

}
