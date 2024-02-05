import { Component, Input, OnDestroy, OnInit, HostListener, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryType } from '../../../../types/category.type';
import { ActiveParamsType } from '../../../../types/active-params.type';
import { ActiveParamsUtil } from '../../utils/active-params.util';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() categories: CategoryType[] = [];

  private subscription: Subscription | null = null;
  filterOpen: boolean = false;
  activeParams: ActiveParamsType = { categories: [] };

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams
      .subscribe(params => {
        this.activeParams = ActiveParamsUtil.processParams(params);
      });
  }

  updateFilterParams(url: string): void {
    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      const existingTypeInParams: string | undefined = this.activeParams.categories.find(category => category === url);
      if (existingTypeInParams) {
        this.activeParams.categories = this.activeParams.categories.filter(category => category !== url);
      } else if (!existingTypeInParams) {
        this.activeParams.categories = [...this.activeParams.categories, url];
      }
    } else {
      this.activeParams.categories = [url];
    }

    this.activeParams.page = 1;

    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  toggleFilter(): void {
    this.filterOpen = !this.filterOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.filterOpen = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
