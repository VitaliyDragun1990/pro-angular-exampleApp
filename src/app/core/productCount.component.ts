import {Component, DoCheck, IterableDiffer, IterableDiffers, OnInit} from '@angular/core';
import {Model} from '../model/repository.model';
import {Product} from '../model/product.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-count',
  template: `
    <div class="bg-info p-a-1">There are {{count}} products</div>`
})
export class ProductCountComponent implements OnInit, DoCheck {
  private differ: IterableDiffer<Product>;
  count = 0;
  private category: string;

  constructor(private model: Model,
              private iterableDiffers: IterableDiffers,
              activateRoute: ActivatedRoute) {
    // activateRoute.pathFromRoot.forEach(route => route.queryParams.subscribe(params => {
    //   if (params['category'] !== null) {
    //     this.category = params['category'];
    //     this.updateCount();
    //   }
    // }));
    activateRoute.queryParams.subscribe(params => {
        this.category = params['category'];
        this.updateCount();
    });
  }

  ngOnInit(): void {
    this.differ = this.iterableDiffers
      .find(this.model.getProducts()).create();
  }

  ngDoCheck(): void {
    if (this.differ.diff(this.model.getProducts()) != null) {
      this.updateCount();
    }
  }

  private updateCount() {
    this.count = this.model.getProducts()
      .filter(p => !this.category || p.category === this.category)
      .length;
  }
}
