import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {filter, map} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  showFooter = true;
  showHeader = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    if (!sessionStorage.getItem('appInitialized')) {
      localStorage.clear();
      sessionStorage.setItem('appInitialized', 'true');
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route.firstChild),
      filter(r => r !== null),
      map(r => r.snapshot.data),
    ).subscribe(data => {
      this.showHeader = data['showHeader'] !== false;
      this.showFooter = data['showFooter'] !== false;
    });
  }
}
