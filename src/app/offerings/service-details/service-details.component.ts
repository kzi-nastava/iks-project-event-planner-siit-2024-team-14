import {Service} from '../model/service.model';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})
export class ServiceDetailsComponent implements OnInit {
  service: Service = {id: -1} as Service;


  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params.subscribe(params =>
    {
      const id = +params['id'];
      // TODO: Load service data instead
      this.service = {
        id: id,
        name: 'Luxury Wedding Photography',
        category: {name: 'Photography', description: '...'},
        description: 'Professional wedding photography package including pre-wedding, ceremony, and reception coverage.',
        specificities: 'Includes 200 edited photos, online gallery, and a printed album.',
        applicableEventTypes: [{name: 'Wedding', description: ''}, {name: 'sth'}],
        price: 2000.12222,
        provider: {email: 'mail@mail.com', id: 1, name: 'aleksa Cetkovic'},
        discount: 0.1} as unknown as Service;
    })
  }
}
