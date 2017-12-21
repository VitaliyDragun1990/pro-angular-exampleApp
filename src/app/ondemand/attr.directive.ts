import {Directive, ElementRef, Input, OnChanges, SimpleChange} from '@angular/core';

@Directive({
  selector: '[appAttr]'
})
export class AttrDirective implements OnChanges {

  @Input('appAttr')
  bgClass: string;

  constructor(private element: ElementRef) {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    const change = changes['bgClass'];
    const classList = this.element.nativeElement.classList;
    if (!change.isFirstChange() && classList.contains(change.previousValue)) {
      classList.remove(change.previousValue);
    }
    if (!classList.contains(change.currentValue)) {
      classList.add(change.currentValue);
    }
  }
}
