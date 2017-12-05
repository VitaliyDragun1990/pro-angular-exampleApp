import {Injectable} from '@angular/core';
import {Product} from './product.model';

@Injectable()
export class StaticDataSource {
  private data: Product[];

  constructor() {
    this.data = [
      new Product(1, 'Kayak', 'Watersports', 275),
      new Product(2, 'Lifejacket', 'Watersports', 48.95),
      new Product(3, 'Soccer Ball', 'Soccer', 19.50),
      new Product(4, 'Corner Flags', 'Soccer', 34.95),
      new Product(5, 'Thinking Cup', 'Chess', 16)
    ];
  }

  getData(): Product[] {
    return this.data;
  }
}
