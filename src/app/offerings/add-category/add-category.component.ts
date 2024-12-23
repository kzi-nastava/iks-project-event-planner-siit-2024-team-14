import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../model/category.model';
import {Observable} from 'rxjs';
import {CategoryService} from '../category.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {

  model!: Category;

  status!: '' | 'submitted' | 'created' | 'error';

  errorMsg = 'Oops! An error occurred while trying to create a category.';
  successMsg = 'Successfully added a new category.';


  constructor(private categoryService: CategoryService, private router: Router) { }


  ngOnInit(): void {
    this.model = {
      name: "",
      description: ""
    };

    this.status = '';
  }


  onSubmit(categoryForm: any) {
    if (categoryForm.valid) {

      this.categoryService.add(this.model).subscribe({
        next: createdCategory => {
          console.log("Created category: ", createdCategory);
          this.status = 'created';
          this.successMsg = `Successfully added a new category: "${createdCategory.name}"`;
        },
        error: err => {
          console.log("Failed to create category: ", err);
          this.status = 'error';
        },
      });

      this.status = 'submitted';
    }
    else {
      console.warn('Trying to submit with invalid category data.');
    }
  }


  goBack() {
    switch (this.status) {
      case 'error':
      {
        this.ngOnInit();
        return;
      }
      case "created":
      {
        this.router.navigate(['/categories']).then();
        return;
      }
    }
  }
}
