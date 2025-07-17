import {Component, inject, OnInit} from '@angular/core';
import {CategoryService} from '../../category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {Category} from '../../model/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {
  fb = inject(FormBuilder);

  categoryFormGroup = this.fb.group({
    name: this.fb.control('', {
      validators: [Validators.minLength(3)],
      nonNullable: true,
    }),
    description: this.fb.control('', { nonNullable: true }),
  });


  category = { id: NaN } as Category;


  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {}


  submit() {
    if (this.categoryFormGroup.invalid) {
      this.categoryFormGroup.markAllAsTouched();
      return;
    }

    const category = {
      ...this.categoryFormGroup.value,
      id: this.category.id
    };

    this.categoryService.update(category)
      .subscribe(category => {
        this.category = category;
        this.reset();
      })
  }


  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.fetchCategory(id);
      }
    );
  }

  private fetchCategory(id: number): Subscription {
    return this.categoryService.getById(id).subscribe({
      next: category => {
        this.category = category;
        this.reset();
      },
      error: _ => console.log('Failed to fetch category: ', id),
    });
  }


  reset() {
    this.categoryFormGroup.reset();
    this.categoryFormGroup.patchValue(this.category);

    this.categoryFormGroup.markAsPristine();
    this.categoryFormGroup.markAsUntouched();
  }

}
