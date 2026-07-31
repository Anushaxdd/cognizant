import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  // Configurable highlight color (default yellow) as specified in Step 37
  @Input() appHighlight: string = 'rgba(234, 179, 8, 0.2)';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // HostListener automatically binds event listeners and handles cleanup (Step 33, 37)
  @HostListener('mouseenter') onMouseEnter(): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appHighlight || 'rgba(234, 179, 8, 0.2)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 0.3s ease');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
  }
}
