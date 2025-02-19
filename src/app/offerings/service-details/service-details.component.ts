import {Service} from '../model/service.model';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServiceService} from '../service.service';


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})
export class ServiceDetailsComponent implements OnInit {
  service: Service = {id: -1} as Service;


  constructor(private route: ActivatedRoute, private serviceService: ServiceService) { }


  ngOnInit(): void {
    this.route.params.subscribe(params =>
    {
      const id = +params['id'];

      this.serviceService.getById(id).subscribe({
        next: service => this.service = service,
        error: err => console.log('Failed to fetch service data.')
      })
    })
  }
}
