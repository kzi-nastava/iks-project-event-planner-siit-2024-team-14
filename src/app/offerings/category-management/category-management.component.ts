import {Component, OnInit} from '@angular/core';
import { Category } from '../model/category.model';
import {CategoryService} from '../category.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css'
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | undefined;

  isPopupVisible = () =>
    !!this.route.children.find((r) => r.outlet === 'popup');

  protected readonly console = console;



  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: categories => this.categories = categories,
      error: _ => console.log('Failed to load categories.')
    });
  }

  showAddCategory() {
    this.router.navigate(
      [{ outlets: { popup: ['add'] } }],
      {
        skipLocationChange: true,
        relativeTo: this.route
      }).then();
  }

  hidePopup() {
    // TODO: figure out if, and how to preserve form state
    this.router.navigate(
      [{ outlets: { popup: null } }],
      {
        skipLocationChange: true,
        relativeTo: this.route
      }).then();
  }


  editCategory(category: Category) {
    console.log('TODO: Implement category edit.');
  }

  deleteCategory(category: Category) {
    console.log('TODO: Implement delete category');
    const id: number = category.id ?? -1; // TODO: Fix
    this.categoryService.delete(id).subscribe({
      next: value => console.log('Deleted category'),
      error: err => console.error('Failed to delete category'),
    });
  }
}
