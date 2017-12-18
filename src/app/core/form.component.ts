import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product.model';
import {Model} from '../model/repository.model';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit {
  product: Product = new Product();
  originalProduct: Product = new Product();
  editing = false;

  constructor(private model: Model, private activateRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.editing = params['mode'] === 'edit';
      const id = params['id'];
      if (id !== null) {
        Object.assign(this.product, this.model.getProduct(+id) || new Product());
        Object.assign(this.originalProduct, this.product);
      }
    });
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      // this.product.price = form.value.price;
      this.model.saveProduct(this.product);
      this.originalProduct = this.product;
      this.router.navigateByUrl('/');
    }
  }

  resetForm() {
    this.product = new Product();
  }
}
