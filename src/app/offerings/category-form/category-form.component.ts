import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Category} from '../model/category.model';
import {FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: []
})
export class CategoryFormComponent implements OnChanges {

  @Input({required: false}) category?: Category;
  @Output() categorySubmit = new EventEmitter<Category>();

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.maxLength(500)]),
  });


  constructor() {}


  onSubmitCategory() {
    if (this.form.valid) {
      const categoryData: Category = {...this.category, ...this.form.value};
      this.categorySubmit.emit(categoryData);
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['category'] && this.category) {
      this.form.patchValue(this.category);
    }
  }
}
