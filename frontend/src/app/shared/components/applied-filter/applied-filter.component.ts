import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ActiveParamsUtil } from "../../utils/active-params.util";
import { ActiveParamsType } from "../../../../types/active-params.type";
import { AppliedFilterType } from "../../../../types/applied-filter.type";
import { CategoryType } from "../../../../types/category.type";
import { PopularArticleType } from "../../../../types/popular-article.type";

@Component({
  selector: 'app-applied-filter',
  templateUrl: './applied-filter.component.html',
  styleUrls: ['./applied-filter.component.scss']
})
export class AppliedFilterComponent implements OnInit, OnDestroy {
  @Input() pages: number[] = [];
  @Input() articles: PopularArticleType[] = [];
  private _categories: CategoryType[] = [];
  appliedFilters: AppliedFilterType[] = [];
  activeParams: ActiveParamsType = { categories: [] };
  private subscription: Subscription | null = null;

  @Input() set categories(value: CategoryType[]) {
    this._categories = value;
    this.updateAppliedFilters();
  }

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe(params => {
      this.activeParams = ActiveParamsUtil.processParams(params);
      this.updateAppliedFilters();
    });
  }

  updateAppliedFilters(): void {
    this.appliedFilters = [];

    this.activeParams.categories.forEach(url => {
      const foundCategory: CategoryType | undefined = this._categories.find(
        (category: CategoryType) => category.url === url
      );

      if (foundCategory) {
        this.appliedFilters.push({
          name: foundCategory.name,
          urlParam: foundCategory.url,
        });
      }
    });
  }

  removeAppliedFilter(appliedFilter: AppliedFilterType) {
    if (this.activeParams.categories) {
      this.activeParams.categories = this.activeParams.categories.filter(
        category => category !== appliedFilter.urlParam
      );
    }

    this.activeParams.page = 1;

    this.router.navigate(['/blog'], {
      queryParams: this.activeParams,
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
