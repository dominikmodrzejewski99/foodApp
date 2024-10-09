import { Component } from '@angular/core';
import {CardComponent} from '../card/card.component';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [
    CardComponent,
    MatProgressBar
  ],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent {

}
