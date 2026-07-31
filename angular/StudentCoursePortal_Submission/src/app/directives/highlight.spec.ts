import { ElementRef, Renderer2 } from '@angular/core';
import { HighlightDirective } from './highlight';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const mockEl = { nativeElement: document.createElement('div') } as ElementRef;
    const mockRenderer = { setStyle: () => {}, removeStyle: () => {} } as unknown as Renderer2;
    const directive = new HighlightDirective(mockEl, mockRenderer);
    expect(directive).toBeTruthy();
  });
});
