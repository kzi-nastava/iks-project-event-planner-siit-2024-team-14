import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Page} from '../../interfaces/page.model';
import {PageEvent} from '@angular/material/paginator';
import {FilterParams} from '../model/filter-params.model';


@Component({
  selector: 'app-solution-list',
  templateUrl: './solution-list.component.html',
  styleUrl: './solution-list.component.css'
})
export class SolutionListComponent implements OnInit {
  page$ = new BehaviorSubject<Page<any>>(this.emptyPage);

  get page() {
    return this.page$.value;
  }

  @Input()
  public solutionSupplier!: (params: any) => Observable<Page<any>>;
  params: FilterParams & {page?: number, size?: number, q?: string} = { page: 0, size: 2 };



  protected onFilter(params: FilterParams) {
    this.params = {...params, page: this.params.page, size: this.params.size, q: this.params.q};
    this.loadSolutions();
  }

  onPageChange(event: PageEvent) {
    this.params = {...this.params, page: event.pageIndex, size: event.pageSize };
    this.loadSolutions();
  }

  onSearch() {
    this.loadSolutions();
  }

  loadSolutions() {
    this.solutionSupplier(this.params)
      .subscribe(page => this.page$.next(page));
  }


  ngOnInit(): void {
    this.loadSolutions();
  }

  get emptyPage(): Page<any> {
    return {
      content: [],
      empty: true,
      first: true,
      last: true,
      number: 0,
      numberOfElements: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    };
  }

}
