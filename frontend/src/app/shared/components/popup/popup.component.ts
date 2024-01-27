import { Component, Inject, OnInit } from '@angular/core';
import { ServiceCardComponent } from "../../../views/main/service-card/service-card.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ServiceService } from "../../services/service.service";
import { RequestTypesType } from "../../../../types/request-types.type";
import { FormBuilder, Validators } from "@angular/forms";
import { RequestService } from "../../services/request.service";
import { RequestType } from "../../../../types/request.type";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  serviceTitles: string[] = [];
  isSelect: boolean = false;
  requestType: RequestTypesType = RequestTypesType.order;
  isOrderCreated: boolean = false;
  errorMessage: string = '';

  form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    service: [this.data.selectedServiceTitle],
  });

  constructor(private dialogRef: MatDialogRef<ServiceCardComponent>,
              private fb: FormBuilder,
              private serviceService: ServiceService,
              private requestService: RequestService,
              @Inject(MAT_DIALOG_DATA) private data: { selectedServiceTitle: string, showSelect: boolean }) {
    this.updateServiceType();
  }

  ngOnInit() {
    this.serviceTitles = this.serviceService.getServiceTitles();
    this.isSelect = this.data.showSelect;

    if (this.isSelect) {
      this.requestType = RequestTypesType.order;
    } else {
      this.requestType = RequestTypesType.consultation;
    }
  }

  get name() {
    return this.form.get('name');
  }

  get phone() {
    return this.form.get('phone');
  }

  updateServiceType() {
    if (this.requestType === RequestTypesType.order) {
      this.form.get('service')?.setValidators(Validators.required);
    } else {
      this.form.get('service')?.removeValidators(Validators.required);
    }

    this.form.get('service')?.updateValueAndValidity();
  }

  createOrder() {
    this.updateServiceType();

    console.log(this.form.value);
    console.log('Type:', this.requestType);

    if (this.form.valid && this.form.value.name && this.form.value.phone) {
      const requestData: RequestType = {
        name: this.form.value.name,
        phone: this.form.value.phone,
        type: this.requestType,
      }

      if (this.requestType === RequestTypesType.order) {
        if (this.form.value.service) {
          requestData.service = this.form.value.service;
        }
      }

      this.requestService.createRequest(requestData)
        .subscribe({
          next: () => {
            this.isOrderCreated = true;
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this.errorMessage = 'Произошла ошибка при отправке формы, попробуйте еще раз.';
            }
          }
        });
    }
  }

  closePopup() {
    this.dialogRef?.close();
  }
}
