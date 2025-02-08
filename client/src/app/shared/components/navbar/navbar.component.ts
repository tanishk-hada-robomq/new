import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() username: string = '';
  @Output() logout = new EventEmitter<void>();

  onClick(){
    this.logout.emit();
  }
}
