import {Component, Inject} from '@angular/core';
import {Model} from '../model/repository.model';
import {MODES, SHARED_STATE, SharedState} from './sharedState.model';
import {Product} from '../model/product.model';
import {Observer} from 'rxjs/Observer';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html'
})
export class TableComponent {

  constructor(private model: Model,
              @Inject(SHARED_STATE) private observer: Observer<SharedState>) {
  }

  getProduct(key: number): Product {
    return this.model.getProduct(key);
  }

  getProducts(): Product[] {
    return this.model.getProducts();
  }

  deleteProduct(key: number) {
    this.model.deleteProduct(key);
  }

  editProduct(key: number) {
    this.observer.next(new SharedState(MODES.EDIT, key));
  }

  createProduct() {
    this.observer.next(new SharedState(MODES.CREATE));
  }

}
