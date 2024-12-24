import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../model/category.model';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {

  model: Category = {} as Category;


  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {}


  onFinishedEditing() {

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
      next: category => this.model = category,
      error: _ => console.log('Failed to fetch category: ', id),
    });
  }

}
