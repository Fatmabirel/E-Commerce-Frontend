import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import {
  DeleteDialogComponent,
  DeleteState,
} from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../services/common/dialog.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private alertifyService: AlertifyService
  ) {
    const img = _renderer.createElement('img');
    img.setAttribute('src', '../../../../../assets/delete.png');
    img.setAttribute('style', 'cursor:pointer;');
    img.width = 35;
    img.height = 35;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @HostListener('click')
  async onclick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        const td: HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService
          .delete(
            {
              controller: this.controller,
            },
            this.id
          )
          .subscribe((data) => {
            $(td.parentElement).animate(
              {
                opacity: 0,
                left: '+=50',
                height: 'toogle',
              },
              () => {
                this.callback.emit();
                this.alertifyService.message('Ürün başarıyla silinmiştir.', {
                  dismissOthers: true,
                  messageType: MessageType.Success,
                  position: Position.BottomRight,
                  delay: 3,
                });
              }
            ),
              (errorResponse: HttpErrorResponse) => {
                this.alertifyService.message(
                  'Ürün silinirken beklenmedik bir hatayla karşılaşıldı.',
                  {
                    dismissOthers: true,
                    messageType: MessageType.Error,
                    position: Position.BottomRight,
                    delay: 3,
                  }
                );
              };
          });
      },
    });
  }
}
