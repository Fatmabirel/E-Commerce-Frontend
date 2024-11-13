import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService
  ) {
    const img = _renderer.createElement('img');
    img.setAttribute('src', '../../../../../assets/delete.png');
    img.setAttribute('style', 'cursor:pointer;');
    img.width = 35;
    img.height = 35;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Output() callback : EventEmitter<any> = new EventEmitter();
  @HostListener('click')

  onclick() {
    const td: HTMLTableCellElement = this.element.nativeElement;
    this.productService.delete(this.id);
    $(td.parentElement).fadeOut(200, () => {
      this.callback.emit();
    });
  }
}
