import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category.model';
import {CategoryService} from '../../category.service';
import {isFunction} from 'rxjs/internal/util/isFunction';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {

  model!: Category;

  status!: '' | 'submitted' | 'created' | 'error';

  successMsg: string | null = null;
  errorMsg: string | null = null;


  constructor(private categoryService: CategoryService) { }


  ngOnInit(): void {
    this.model = {
      id: NaN,
      name: "",
      description: ""
    };

    this.status = '';
  }


  onSubmit(categoryForm: any) {
    if (categoryForm.valid) {

      this.categoryService.add(this.model).subscribe({
        next: this.successHandler.bind(this),
        error: this.errorHandler.bind(this),
      });

      this.status = 'submitted';
    }
    else {
      console.warn('Trying to submit with invalid category data.');
    }
  }



  protected successHandler(response: Category): void {
    this.status = 'created';
    this.errorMsg = null;
    this.successMsg = `Successfully added a new category: "${response.name}"`;
  }


  protected errorHandler(err: any): void {
    this.status = 'error';
    this.errorMsg = err?.message ?? 'Oops! Failed to create a new category.';
    this.successMsg = null;
  }
}
