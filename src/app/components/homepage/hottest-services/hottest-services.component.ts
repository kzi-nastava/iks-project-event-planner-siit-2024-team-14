import { Component, OnInit } from '@angular/core';
import { HottestSolutionsService } from './hottest-services.service';
import { SolutionModel } from '../../../interfaces/solution.model';

@Component({
  selector: 'app-hottest-services',
  templateUrl: './hottest-services.component.html',
  styleUrl: './hottest-services.component.css'
})
export class HottestServicesComponent implements OnInit {

  hottestSolutions: SolutionModel[] = [];
  blockedUserIds: number[] = [];
  baseUrl = 'http://localhost:8080/';

  currentSlide = 0;

  constructor(private solutionsService: HottestSolutionsService) {}

  ngOnInit() {
    this.loadTopSolutions();
  }

  loadTopSolutions(): void {
    this.solutionsService.getBlockedUsers().subscribe(
      (blockedUsers) => {
        this.blockedUserIds = blockedUsers;

        this.solutionsService.getTopSolutions().subscribe(
          (data) => {
            // Dodaj puni URL za slike pre filtriranja i dodeljivanja
            const solutionsWithFullUrls = data.map(solution => this.addFullImageUrl(solution));
            this.hottestSolutions = solutionsWithFullUrls.filter(solution =>
              !this.blockedUserIds.includes(solution.providerId)
            );
          },
          (error) => {
            console.error('Error loading solutions:', error);
          }
        );
      },
      (error) => {
        console.error('Error loading blocked users:', error);
      }
    );
  }

  private addFullImageUrl(solution: SolutionModel): SolutionModel {
    return {
      ...solution,
      imageUrl: this.baseUrl + solution.imageUrl
    };
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
