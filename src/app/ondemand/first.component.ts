import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Model} from '../model/repository.model';
import {Product} from '../model/product.model';
import {RestDataSource} from '../model/rest.datasource';

@Component({
  selector: 'app-first',
  templateUrl: 'first.component.html'
})
export class FirstComponent implements OnInit {
  category = 'Soccer';
  highlighted = false;

  // for asynchronous test
  private _category = 'Soccer';
  private _products: Product[] = [];

  @Output('pa-highlight')
  change = new EventEmitter<boolean>();

  @Input('pa-model')
  model: Model;

  constructor(private repository: Model,
              public datasource: RestDataSource) {
  }

  ngOnInit() {
    this.updateData();
  }

  getProductsD(): Product[] {
    return this._products;
  }

  set categoryD(newValue: string) {
    this._category = newValue;
    this.updateData();
  }

  private updateData() {
    this.datasource.getData()
      .subscribe(data => this._products = data
        .filter(p => p.category === this._category));
  }

  getProducts(): Product[] {
    return this.repository.getProducts()
      .filter(p => p.category === this.category);
  }

  getAllProducts(): Product[] {
    return this.model == null ? [] : this.model.getProducts()
      .filter(p => p.category === this.category);
  }

  @HostListener('mouseenter', ['$event.type'])
  @HostListener('mouseleave', ['$event.type'])
  setHighlight(type: string) {
    this.highlighted = type === 'mouseenter';
    this.change.emit(this.highlighted);
  }
}
