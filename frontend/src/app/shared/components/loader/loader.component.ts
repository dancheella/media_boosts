import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from "../../services/loader.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit, OnDestroy {
  isShowed: boolean = false;
  private subscription: Subscription | null = null;

  constructor(private loacerService: LoaderService) {
  }

  ngOnInit() {
    this.subscription = this.loacerService.isShowed$
      .subscribe((isShowed: boolean) => {
        this.isShowed = isShowed;
      })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
