import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[jhiNext]',
})
export class NextDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click')
  nextFunc() {
    alert('kl');
    var elm = this.el.nativeElement.parentElement.parentElement.children[0];
    var item = elm.getElementsByClassName('item');
    elm.append(item[0]);
  }
}
