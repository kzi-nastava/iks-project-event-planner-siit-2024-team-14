import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-solution-card',
  templateUrl: './solution-card.component.html',
  styleUrl: './solution-card.component.css'
})
export class SolutionCardComponent {
  @Input() solution!: any;


  get isService() {
    if (this.solution.solutionType) {
      return this.solution.solutionType === 'Service';
    }

    return !!this.solution.reservationPeriod;
  }

  get isProduct() {
    return !this.isService;
  }

  get type() {
    return this.isService ? 'service' : 'product';
  }

  get category() {
    return this.solution.category;
  }

  get provider() {
    return this.solution.provider;
  }

  get imageUrl() {
    try {
      const imageUrl: string = this.solution.imageUrl;
      new URL(imageUrl);
      return imageUrl;
    } catch {
      return undefined;
    }
  }

}
