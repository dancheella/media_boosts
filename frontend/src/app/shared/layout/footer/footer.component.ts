import { Component } from '@angular/core';
import { PopupComponent } from "../../components/popup/popup.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number;

  constructor(private dialog: MatDialog) {
    this.currentYear = new Date().getFullYear();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, showSelect: boolean): void {
    this.dialog.open(PopupComponent, {
      width: '727px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { showSelect }
    });
  }
}
