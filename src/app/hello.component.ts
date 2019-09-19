import { Component, Input } from '@angular/core';
import { IgxGridComponent, IgxCarouselComponent } from 'igniteui-angular'
import { Observable, from } from 'rxjs';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styles: [`
  h1 { font-family: Lato; }
  .igx-carousel__inner {
    width: 100%;
    text-align: center; 
}

igx-carousel igx-icon.igx-icon{
    color: #e41c77;
}

span.progress-linear__value {
    display: none;
}

ul.igx-carousel__indicators {
    display: none;
}

div.igx-slide img {
    width: 80%
}

h6 {
  height: 25px;
  margin: 0px;
}
  `]
})
export class HelloComponent  {
  @Input() name: string;

  gridData: any;

  ngOnInit() {
     this.gridData = dummyData;
  }
}


  const dummyData = [
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
    {col1: 'one', col2: 'two', col3: 'three', col4: 'four'},
  ]

