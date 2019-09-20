import { Component, Input } from '@angular/core';
import { IgxGridComponent, IgxCarouselComponent } from 'igniteui-angular'
import { Observable, from, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';
import { stringify } from 'querystring';
import { getLocaleDateTimeFormat } from '@angular/common';

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
export class HelloComponent {
  @Input() name: string;
  @Input('colCount') colCount_i: number;
  @Input('rowCount') rowCount_i: number;

  gridData: any;
  bigData: Array<LooseType>;
  hugeData: Observable<Array<LooseType>>;
  rowCount = 50;
  colCount = 5;

  ngOnInit() {
    if(this.colCount_i)
      this.colCount = this.colCount_i;
    if(this.rowCount_i)
      this.rowCount = this.rowCount_i;
      
    this.hugeData = this.getDataAsync();

    this.gridData = dummyData;
  }

  getDatax() {
    this.bigData.reduce((seq, n) => {
      return seq.then(() => {
        return new Promise(res => setTimeout(res, 1));
      });
    }, Promise.resolve()).then(
      () => console.log('done'),
      (e) => console.log(`error ${e}`)
    )
  }


  getDataAsync() {    
    return new Observable<Array<LooseType>>((observer) => {
      observer.next(this.getData());
      observer.complete();
    });
  }

  getData() {
    let data: Array<LooseType>;
    data = [];
    let cols: Array<string>;
    cols = [];
    for (var c = 0; c < this.colCount; c++) {
      switch (Math.floor(Math.random() * 3)) {
        case 0:
        case 1:
          cols.push(colTypeNumber);
          break;
        case 2:
        case 3:
          cols.push(colTypeString);
          break;
        case 4:
          cols.push(colTypeBool);
          break;
        case 5:
          cols.push(colTypeDate);
          break;
      }
    }
    for (var r = 0; r < this.rowCount; r++) {

      let row: LooseType = {index: r};
      for (var c = 0; c < this.colCount; c++) {
        switch (cols[c]) {
          case colTypeNumber:
              //eval('row.'+'col'+c+'=' + Math.floor(Math.random() * 1000));
              eval(`row.col${c}=${this.makeNumber(10000)}`);
              break;
          case colTypeString:
              eval(`row.col${c}='${this.makeString(10000)}'`);
            break;
          case colTypeBool:
              eval(`row.col${c}='${this.makeBool()}'`);
            break;
          case colTypeDate:
              eval(`row.col${c}='${this.makeDate()}'`);
            break;
        }
      }
      data.push(row);
    }

    return data;
  }

  static characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.*';
  makeString(length) {
    var result           = '';
    var charactersLength = HelloComponent.characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += HelloComponent.characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 makeNumber(length) {
   return Math.floor(Math.random() * length);
 }
 makeBool() {
  return Math.random() > 0.5;
 }
 makeDate() {
   let d = new Date();
   d.setDate(d.getDate() + 10 - (Math.random() * 30));
  return d;
 }
}

export interface LooseType {
  index?: number,
  [key: string]: any
}

const colTypeNumber = 'number';
const colTypeString = 'string';
const colTypeBool = 'bool';
const colTypeDate = 'date';


const dummyData = [
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
  { col1: 'one', col2: 'two', col3: 'three', col4: 'four' },
]

