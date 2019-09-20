import { Component, Input, HostBinding, AfterContentChecked, ViewChild } from '@angular/core';
import { IgxGridComponent, IgxCarouselComponent } from 'igniteui-angular'
import { Observable, from, pipe } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { DataService, LooseType } from "./data.service";

@Component({
  selector: 'big-grid',
  templateUrl: './big-grid.component.html',
  styleUrls: ['./big-grid.component.scss']
})
export class BigGrid {
  @Input('colCount') colCount_i: number;
  @Input('rowCount') rowCount_i: number;
  @ViewChild('grid1', {static: false}) private grid : IgxGridComponent; 

  @HostBinding("class")
    public themesClass: THEME = THEME.LIGHT;
    
  gridData: any;
  bigData: Array<LooseType> = [];
  hugeData: Observable<Array<LooseType>>;
  rowCount = 50;
  colCount = 5;
  cols: Array<string>;
  isLoading = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    if(this.colCount_i)
      this.colCount = this.colCount_i;
    if(this.rowCount_i)
      this.rowCount = this.rowCount_i;
      
    this.hugeData = this.dataService.getData(this.colCount, this.rowCount).pipe(delay(2000));
    this.fetchData();
    //this.gridData = dummyData0;
  }

  timer: any;

  ngAfterContentInit(): void {
    console.log('ngAfterContentChecked');
    
    this.timer = setTimeout(() => this.setGridColumnProps(this), 5000);
  }

  setGridColumnProps(_this: BigGrid) {
    console.log(_this.grid);
    //return;
    this.grid.columns.forEach(c => {
      if(c.index <= 2) {
        c.pinned = true;        
        c.sortable = true;
      }
      else{
        c.sortable = Math.random() > 0.5;
      }
      c.minWidth = '60';
      c.autosize();
      c.resizable = true;
      //setTimeout(c.autosize, 1000);
    });
  }

 
  fetchData() {
    //this.grid.data = this.hugeData;
    console.log('fetchData');
    this.hugeData.subscribe((d) => {
      //console.log(`fetching: ${d}`);
    },
    (e) => {console.log(`error: ${e}`)},
    () => {console.log('Completed'); this.isLoading = false;}
    );

  }

   toggleDarkTheme() {
    this.themesClass = this.themesClass === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
  }

}


export enum THEME {
  LIGHT = "light-theme",
  DARK = "dark-theme",
  BLACK = "black-theme"
}



const dummyData0 = [
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

