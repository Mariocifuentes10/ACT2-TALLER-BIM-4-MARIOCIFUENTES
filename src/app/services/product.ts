import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  registerProduct(product: Product): Observable<boolean> {
    console.log('Datos enviados al backend (Servicio):', product);
    return of(true);
  }
}