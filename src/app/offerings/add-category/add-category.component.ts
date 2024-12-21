import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../model/category.model';
import {Observable} from 'rxjs';
import {CategoryService} from '../category.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  model: Category = {
    name: "",
    description: ""
  };



  constructor(private categoryService: CategoryService, private router: Router) { }



  onSubmit(categoryForm: any) {
    if (categoryForm.valid) {

      this.categoryService.add(this.model).subscribe({
        next: createdCategory => {
          console.log("Created category: ", createdCategory);
          this.router.navigate(['categories']).then(); // idk where to go, maybe back (this seems appropriate (not the hardcoded path part))
        },
        error: err => {
          console.error("Failed to create category: ", err);
        },
      });

    }
    else {
      console.warn('Trying to submit with invalid category data.');
    }
  }
}
