import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../model/category.model';
import {HasId} from '../model/has-id.model';


@Component({
  selector: 'app-category-expansion-panel',
  templateUrl: './category-expansion-panel.component.html',
  styleUrls: ['./category-expansion-panel.component.css',]
})
export class CategoryExpansionPanelComponent {
  @Input({required: true}) category!: Category & HasId;

  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Category>();



  deleteCategory() {
    this.delete.emit(this.category.id);
  }

  editCategory() {
    this.edit.emit(this.category);
  }
}
