import {Component} from '@angular/core';
import {Model} from '../model/repository.model';
import {Product} from '../model/product.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html'
})
export class TableComponent {
  category: string = null;

  constructor(private model: Model, activateRoute: ActivatedRoute) {
    activateRoute.queryParams.subscribe(params => {
      this.category = params['category'] || null;
    });
  }

  getProduct(key: number): Product {
    return this.model.getProduct(key);
  }

  getProducts(): Product[] {
    return this.model.getProducts()
      .filter(p => this.category == null || p.category === this.category);
  }

  get categories(): string[] {
    return this.model.getProducts()
      .map(p => p.category)
      .filter((category, index, array) => array.indexOf(category) === index);
  }

  deleteProduct(key: number) {
    this.model.deleteProduct(key);
  }
}
