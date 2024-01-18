import { Component, Input } from '@angular/core';
import { ServiceType } from "../../../../types/service.type";

@Component({
  selector: 'service-card',
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {
  @Input() service: ServiceType;

  constructor() {
    this.service = {
      image: '',
      title: '',
      description: '',
      price: '',
    }
  }
}
