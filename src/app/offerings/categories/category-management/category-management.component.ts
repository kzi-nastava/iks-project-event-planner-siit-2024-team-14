import {Component, OnDestroy, OnInit} from '@angular/core';
import { Category } from '../../model/category.model';
import {CategoryService} from '../../category.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ConfirmDialogComponent} from '../../../dialogs/confirm-dialog/confirm-dialog';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css'
})
export class CategoryManagementComponent implements OnInit, OnDestroy {
  categories: Category[] = [];

  isPopupVisible!: boolean;
  private routerSubscription?: Subscription;




  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadCategories();
    this.checkIfPopupShouldShow();

    this.routerSubscription = this.router.events.subscribe({
      next: event => {
        if (event instanceof NavigationEnd)
          this.checkIfPopupShouldShow();
      }
    })
  }


  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: categories => this.categories = [...categories],
      error: _ => console.log('Failed to load categories.')
    });
  }


  showAddCategory() {
    this.router.navigate(
      [{ outlets: { popup: ['add'] } }],
      {
        skipLocationChange: true,
        relativeTo: this.route,
        state: {},
      }).then();
  }


  hidePopup() {
    this.router.navigate(
      [{ outlets: { popup: null } }],
      {
        skipLocationChange: true,
        relativeTo: this.route,
      }).then();
  }


  showEditCategory(category: Category) {
    this.router.navigate(
      [{ outlets: { popup: [category.id, 'edit'] } }],
      {
        skipLocationChange: true,
        relativeTo: this.route,
        state: {...category},
      }).then();
  }

  deleteCategory(category: Category) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Confirmation`,
        message: `Are you sure you want to delete "${category.name}"`
      }
    })
      .afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.delete(category)
          .subscribe(() => this.categories = this.categories.filter(c => c.id !== category.id));
      }
    })
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  private checkIfPopupShouldShow() {
    this.isPopupVisible = this.route.children.some(r => 'popup' === r.outlet)
  }
}
