import { Injectable } from '@angular/core';
import {environment} from '../../environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {
  }

  getRestaurants() {
    return this.http.get(`${this.apiUrl}/restaurants`);
  }
}
