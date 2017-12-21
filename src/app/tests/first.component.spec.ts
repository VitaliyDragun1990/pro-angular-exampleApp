import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FirstComponent} from '../ondemand/first.component';
import {Product} from '../model/product.model';
import {Model} from '../model/repository.model';
import {DebugElement, Injectable} from '@angular/core';
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

describe('FirstComponent', () => {

  let fixture: ComponentFixture<FirstComponent>;
  let component: FirstComponent;
  let debugElement: DebugElement;
  let spanElement: HTMLSpanElement;
  let divElement: HTMLDivElement;
  const dataSource = new MockDataSource();

  // create mock repository object as substitute fo real service
  const mockRepository = {
    getProducts: function () {
      return [
        new Product(1, 'test1', 'Soccer', 100),
        new Product(1, 'test2', 'Chess', 100),
        new Product(1, 'test3', 'Soccer', 100)
      ];
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({  // create a mock module for component testing
      declarations: [FirstComponent],
      providers: [
        {provide: Model, useValue: mockRepository},
        {provide: RestDataSource, useValue: dataSource}
      ]
    });
    TestBed.compileComponents().then(() => {  // compile component with external template
      fixture = TestBed.createComponent(FirstComponent);
      component = fixture.componentInstance;    // return component instance
      debugElement = fixture.debugElement;      // root template element of tested component
      // find DOM element in component's template that contains binding expression
      spanElement = debugElement.query(By.css('span')).nativeElement;
      divElement = debugElement.children[0].nativeElement; // find div element in root template
    });
  }));

  it('is defined', () => {
    expect(component).toBeDefined();
  });

  it('filters categories', () => {
    component.category = 'Chess';
    fixture.detectChanges();  // trigger change detection cycle in component -> its template
    expect(component.getProducts().length).toBe(1);
    expect(spanElement.textContent).toContain('1');

    component.category = 'Running';
    fixture.detectChanges();  // trigger change detection cycle in component -> its template
    expect(component.getProducts().length).toBe(0);
    expect(spanElement.textContent).toContain('0');
  });

  it('handles mouse events', () => {
    expect(component.highlighted).toBeFalsy();    // initial value must be false
    expect(divElement.classList.contains('bg-success')).toBeFalsy();  // div must not contain specific class without mouseenter event
    debugElement.triggerEventHandler('mouseenter', new Event('mouseenter'));  // trigger specific event
    fixture.detectChanges();  // trigger change detection cycle in component -> its template
    expect(component.highlighted).toBeTruthy(); // after event value must be true
    expect(divElement.classList.contains('bg-success')).toBeTruthy(); // after event div must contain specific class
    debugElement.triggerEventHandler('mouseleave', new Event('mouseleave'));
    fixture.detectChanges();
    expect(component.highlighted).toBeFalsy();
    expect(divElement.classList.contains('bg-success')).toBeFalsy();
  });

  it('implements output property', () => {
    let highlighted: boolean;
    component.change.subscribe(value => highlighted = value);
    debugElement.triggerEventHandler('mouseenter', new Event('mouseenter'));
    expect(highlighted).toBeTruthy();
    debugElement.triggerEventHandler('mouseleave', new Event('mouseleave'));
    expect(highlighted).toBeFalsy();
  });

  it('perform async op', () => {
    dataSource.data.push(new Product(100, 'test100', 'Soccer', 100));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.getProductsD().length).toBe(3);
    });
  });
});
