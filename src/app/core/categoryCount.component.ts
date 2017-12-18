import {Component, DoCheck, IterableDiffer, IterableDiffers, OnInit} from '@angular/core';
import {Product} from '../model/product.model';
import {Model} from '../model/repository.model';

@Component({
  selector: 'app-category-count',
  template: `
    <div class="bg-primary p-a-1">There are {{count}} categories</div>`
})
export class CategoryCountComponent implements OnInit, DoCheck {
  private differ: IterableDiffer<Product>;
  count = 0;

  constructor(private model: Model,
              private iterableDiffers: IterableDiffers) {
  }

  ngOnInit() {
    this.differ = this.iterableDiffers
      .find(this.model.getProducts())
      .create();
  }

  ngDoCheck(): void {
    if (this.differ.diff(this.model.getProducts()) != null) {
      this.count = this.model.getProducts()
        .map(p => p.category)
        .filter((category, index, array) => array.indexOf(category) === index)
        .length;
    }
  }
}
