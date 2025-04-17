import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DividerModule
  ]
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Zespół Podróże Dominikańskie',
      role: 'Założyciele',
      bio: 'Jesteśmy grupą pasjonatów podróży, którzy dzielą się swoimi doświadczeniami kulinarnymi z całego świata. Nasza przygoda z jedzeniem zaczęła się podczas podróży po Dominikanie, gdzie odkryliśmy, jak ważne jest dobre jedzenie w poznawaniu nowych kultur.',
      image: '/assets/team-photo.jpg',
      social: {
        tiktok: 'https://www.tiktok.com/@podrozedominikanskie',
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/'
      }
    }
  ];
}
