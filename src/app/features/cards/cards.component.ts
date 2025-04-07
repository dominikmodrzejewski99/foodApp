import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from "primeng/card";
import { httpResource } from "@angular/common/http";
import { Caa0baf44bc64c9b94a44e9ed5bc418d200ResponseInner as Question } from "../../core/api/api";

interface ErrorResponse {
  message: string;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, Card ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  questionsResource = httpResource<Question[]>('http://127.0.0.1:8001/api/questions');
}
