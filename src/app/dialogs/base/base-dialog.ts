import { inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export class BaseDialog<DialogComponent> {
  constructor(readonly dialogRef = inject(MatDialogRef<DialogComponent>)) {}

  close() {
    this.dialogRef.close();
  }
}
