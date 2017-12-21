import {Component, DebugElement, Injectable, ViewChild} from '@angular/core';
import {Model} from '../model/repository.model';
import {FirstComponent} from '../ondemand/first.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Product} from '../model/product.model';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import {RestDataSource} from '../model/rest.datasource';

@Injectable()
class MockDataSource {
  public data = [
    new Product(1, 'test1', 'Soccer', 100),
    new Product(2, 'test2', 'Chess', 100),
    new Product(3, 'test3', 'Soccer', 100),
  ];

  getData(): Observable<Product[]> {
    return new Observable<Product[]>(obs => {
      setTimeout(() => obs.next(this.data), 1000);
    });
  }
}

@Component({
  template: `
    <app-first [pa-model]="model"></app-first>`
})
class TestComponent {

  constructor(public model: Model) {
  }

  @ViewChild(FirstComponent)
  firstComponent: FirstComponent;
}

describe('FirstComponent_test_suit_2', () => {

  let fixture: ComponentFixture<TestComponent>;
  let component: FirstComponent;
  let debugElement: DebugElement;
  const dataSource = new MockDataSource();

  const mockRepository = {
    getProducts: function () {
      return [
        new Product(1, 'test1', 'Soccer', 100),
        new Product(2, 'test2', 'Chess', 100),
        new Product(3, 'test3', 'Soccer', 100),
      ];
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FirstComponent, TestComponent],
      providers: [
        {provide: Model, useValue: mockRepository},
        {provide: RestDataSource, useValue: dataSource}
      ]
    });
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance.firstComponent;
      debugElement = fixture.debugElement.query(By.directive(FirstComponent));
    });
  }));

  it('receives the model through an input property', () => {
    component.category = 'Chess';
    fixture.detectChanges();
    const products = mockRepository.getProducts()
      .filter(p => p.category === component.category);
    const componentProducts = component.getAllProducts();
    for (let i = 0; i < componentProducts.length; i++) {
      expect(componentProducts[i]).toEqual(products[i]);
    }
    expect(debugElement.query(By.css('span')).nativeElement.textContent)
      .toContain(products.length);
  });
});
