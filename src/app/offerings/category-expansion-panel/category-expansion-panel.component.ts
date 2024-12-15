import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../model/category.model';


@Component({
  selector: 'app-category-expansion-panel',
  templateUrl: './category-expansion-panel.component.html',
  styleUrls: ['./category-expansion-panel.component.css',]
})
export class CategoryExpansionPanelComponent {
  @Input({required: true}) category!: Category;

  @Output() delete = new EventEmitter<Category>();
  @Output() edit = new EventEmitter<Category>();



  deleteCategory() {
    // TODO: Display a confirmation popup
    this.delete.emit(this.category);
  }

  editCategory() {
    this.edit.emit(this.category);
  }
}
