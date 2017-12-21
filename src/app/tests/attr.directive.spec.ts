import {Component, ViewChild} from '@angular/core';
import {AttrDirective} from '../ondemand/attr.directive';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

@Component({
  template: `
    <div><span [appAttr]="className">Test Content</span></div>`
})
class TestComponent {
  className = 'initialClass';

  @ViewChild(AttrDirective)
  attrDirective: AttrDirective;
}

describe('AttrDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let directive: AttrDirective;
  let spanElement: HTMLSpanElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, AttrDirective]
    });
    fixture = TestBed.createComponent(TestComponent);
    directive = fixture.componentInstance.attrDirective;
    spanElement = fixture.debugElement.query(By.css('span')).nativeElement;
  });

  it('generates the correct number of elements', () => {
    fixture.detectChanges();
    expect(directive.bgClass).toBe('initialClass');
    expect(spanElement.className).toBe('initialClass');

    fixture.componentInstance.className = 'nextClass';
    fixture.detectChanges();
    expect(directive.bgClass).toBe('nextClass');
    expect(spanElement.className).toBe('nextClass');
  });
});
