import {Component, OnInit} from '@angular/core';
import { HottestSolutionsService, SolutionModel } from '../../../services/hottest-services.service';
@Component({
  selector: 'app-hottest-services',
  templateUrl: './hottest-services.component.html',
  styleUrl: './hottest-services.component.css'
})
export class HottestServicesComponent implements OnInit {

  hottestSolutions: SolutionModel[] = [];

  currentSlide = 0;

  constructor(private solutionsService: HottestSolutionsService) {}

  ngOnInit() {
    this.solutionsService.getTopSolutions().subscribe((solutions: SolutionModel[]) => {
      this.hottestSolutions = solutions;
    });
  }

  nextSlide() {
    if (this.currentSlide < this.hottestSolutions.length - 4) {
      this.currentSlide += 1.5;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide -= 1.5;
    }
  }

  getTransform() {
    return `translateX(-${this.currentSlide * 33.33}%)`;
  }
}
