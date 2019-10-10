import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlightElement]'
})
export class HighlightElementDirective {

  constructor(private element: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('white');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }

}
