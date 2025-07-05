import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {PriceListService} from '../../price-list.service';
import {merge, startWith, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.css'
})
export class PriceListComponent implements AfterViewInit {
  data = [] as any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalElements = NaN;


  ngAfterViewInit() {
    merge(this.paginator.page,)
      .pipe(
        startWith(void 0),
        switchMap(
          this.priceListService.getProviderSolutions.bind(this.priceListService, { page: this.paginator.pageIndex, size: this.paginator.pageSize })
        ),
        tap(
          page => [this.data, this.totalElements] = [page.content, page.totalElements]
        ),
      )
      .subscribe();
  }



  exportPdf() {
    this.priceListService.exportPriceListPdf()
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      })
  }


  priceListService = inject(PriceListService);
}
