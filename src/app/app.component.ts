import { Component } from '@angular/core';

@Component({
  selector: 'app-root',  // The selector is the tag name for this component in your HTML
  templateUrl: './app.component.html',  // The path to the template file
  styleUrls: ['./app.component.css']  // The path to the component's styles (CSS)
})
export class AppComponent {
  title = 'My Angular App';  // An example property that can be used in the template
}
