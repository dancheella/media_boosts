import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PopularArticleType } from "../../../../types/popular-article.type";
import { ActiveParamsType } from "../../../../types/active-params.type";
import { ActivatedRoute, Router } from "@angular/router";
import { ActiveParamsUtil } from "../../utils/active-params.util";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit, OnDestroy{
  articles: PopularArticleType[] = [];

  activeParams: ActiveParamsType = { categories: [] };

  @Input() pages: number[] = [];

  private subscription: Subscription | null = null;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe(params => {
      this.activeParams = ActiveParamsUtil.processParams(params);
    });
  }

  openPage(page: number): void {
    this.activeParams.page = page;

    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  openPrevPage(): void {
    if (this.activeParams.page &&this.activeParams.page > 1) {
      this.activeParams.page--;

      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }

  openNextPage(): void {
    if (!this.activeParams.page) {
      this.activeParams.page = 1
    }

    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;

      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
