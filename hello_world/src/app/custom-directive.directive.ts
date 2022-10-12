import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCustomDirective]'
})
export class CustomDirectiveDirective {

  @Input('appCustomDirective') format;
  constructor(private el: ElementRef) { }

  @HostListener('blur') onBlur() {
    let value = this.el.nativeElement.value;
    if (this.format == 'lowercase') {
      this.el.nativeElement.value = value.toLowerCase();
    } else if (this.format == 'uppercase') {
      this.el.nativeElement.value = value.toUpperCase();
    }
  }
}
