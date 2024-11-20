import {Component, OnInit} from '@angular/core';
import {Service} from '../model/service.model';
import {ActivatedRoute} from '@angular/router';
import {Offering} from '../model/offering.model';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})
export class ServiceDetailsComponent implements OnInit {
  protected service?: Offering;


  constructor(private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.route.params.subscribe(params =>
    {
      const id = +params['id'];
      if(!isNaN(id)) {
        this.service = {id: Number(id), isDeleted: false, name: 'Horse Riding Lessons'};
      }
    });
  }

  protected readonly JSON = JSON;
}
