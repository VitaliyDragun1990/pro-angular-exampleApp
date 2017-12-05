import {Component, Inject} from '@angular/core';
import {Product} from '../model/product.model';
import {Model} from '../model/repository.model';
import {SHARED_STATE, SharedState} from './sharedState.model';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent {
  product: Product = new Product();
  editing = false;

  constructor(private model: Model,
              @Inject(SHARED_STATE) public stateEvents: Observable<SharedState>) {

    this.stateEvents
      .pipe(
        distinctUntilChanged((firstState, secondState) =>
          firstState.mode === secondState.mode && firstState.id === secondState.id
        )
      )
      .subscribe((update) => {
        this.product = new Product();
        if (update.id !== undefined) {
          Object.assign(this.product, this.model.getProduct(update.id));
        }
      });
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.model.saveProduct(this.product);
      this.product = new Product();
      form.reset();
    }
  }

  resetForm() {
    this.product = new Product();
  }
}
