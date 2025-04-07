import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, MenubarModule, AvatarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items: MenuItem[] = [
    {
      label: 'Strona główna',
      icon: 'pi pi-home',
      routerLink: '/'
    },
    {
      label: 'Restauracje',
      icon: 'pi pi-map-marker',
      routerLink: '/restaurants'
    },
    {
      label: 'Pytania',
      icon: 'pi pi-question-circle',
      routerLink: '/questions'
    },
    {
      label: 'O nas',
      icon: 'pi pi-info-circle',
      routerLink: '/about'
    }
  ];
}
