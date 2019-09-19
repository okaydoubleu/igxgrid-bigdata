import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styles: [ `p {
  font-family: Lato;
}` ]
})
export class AppComponent  {
  name = 'Angular';
}
