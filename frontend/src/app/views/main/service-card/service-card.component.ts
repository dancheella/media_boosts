import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceType } from '../../../../types/service.type';
import { PopupComponent } from "../../../shared/components/popup/popup.component";

@Component({
  selector: 'service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent {
  @Input() service: ServiceType;

  constructor(private dialog: MatDialog) {
    this.service = {
      image: '',
      title: '',
      description: '',
      price: '',
    };
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, selectedServiceTitle: string, showSelect: boolean): void {
    this.dialog.open(PopupComponent, {
      width: '727px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { selectedServiceTitle, showSelect }
    });
  }
}
