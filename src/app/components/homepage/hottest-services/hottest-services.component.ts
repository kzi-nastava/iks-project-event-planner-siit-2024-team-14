import {Component, OnInit} from '@angular/core';
import { HottestSolutionsService} from './hottest-services.service';
import {SolutionModel} from '../../../interfaces/solution.model';
@Component({
  selector: 'app-hottest-services',
  templateUrl: './hottest-services.component.html',
  styleUrl: './hottest-services.component.css'
})
export class HottestServicesComponent implements OnInit {

  hottestSolutions: SolutionModel[] = [];
  blockedUserIds: number[] = [];

  currentSlide = 0;

  constructor(private solutionsService: HottestSolutionsService) {}

  ngOnInit() {
    this.loadTopSolutions();
  }

  loadTopSolutions(): void {
    this.solutionsService.getBlockedUsers().subscribe(
      (blockedUsers) => {
        this.blockedUserIds = blockedUsers;
        if (this.blockedUserIds && this.blockedUserIds.length > 1) {
          this.solutionsService.getTopSolutions().subscribe(
            (data) => {
              this.hottestSolutions = data.filter(solution =>
                !this.blockedUserIds.includes(solution.providerId) // Filtrira rešenja od blokiranih korisnika
              );
            },
            (error) => {
              console.error('Error loading solutions:', error);
            }
          );
        }else {
          this.solutionsService.getTopSolutions().subscribe(
            (data) => {
              this.hottestSolutions = data;
            },
            (error) => {
              console.error('Error loading solutions:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error loading blocked users:', error);
      }
    );
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
