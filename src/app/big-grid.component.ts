import { Component, Input, HostBinding, ViewChild } from '@angular/core';
import { IgxGridComponent, IgxColumnComponent } from 'igniteui-angular'
import { Observable, from, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DataService, LooseType } from "./data.service";
import { formatDate, formatNumber } from '@angular/common';

@Component({
  selector: 'big-grid',
  templateUrl: './big-grid.component.html',
  styleUrls: ['./big-grid.component.scss']
})
export class BigGrid {
  @Input('colCount') colCount_in: number;
  @Input('rowCount') rowCount_in: number;
  @Input('dataInjectInterval') dataInjectInterval_in: number;
  @ViewChild('grid1', { static: false }) private grid: IgxGridComponent;

  // @HostBinding("class")
  // public themesClass: THEME = THEME.LIGHT;

  gridData: any;
  bigData: Array<LooseType> = [];
  hugeData: Observable<Array<LooseType>>;
  rowCount:number = 50;
  colCount:number = 5;
  cols: Array<string>;
  isLoading = true;
  liveUpdateEnabled = false;
  liveSort = false;
  liveUpdateTimer: any;
  timerDuration = 30;
  lastDataFetchTime: Date;
  


  constructor(private dataService: DataService) { }

  ngOnInit() {
    if (this.colCount_in)
      this.colCount = this.colCount_in;
    if (this.rowCount_in)
      this.rowCount = this.rowCount_in;
    if (this.dataInjectInterval_in)
      this.timerDuration = this.dataInjectInterval_in;

      console.log(`ngOnInit> colCount:${this.colCount} rowCount:${this.rowCount} timerDuration:${this.timerDuration} `)
    this.hugeData = this.dataService.getData(this.colCount, this.rowCount, this.cols).pipe(delay(2000));
    this.lastDataFetchTime = new Date();
    this.timer = setTimeout(() => this.setGridColumnProps(this), 100);

    //this.fetchData();
    //this.gridData = dummyData0;
  }

  initColumns(e: IgxColumnComponent) {
    if (e.index < this.colCount + 1)
     return;
     this.setGridColumnProps(this);
     this.isLoading = false;
  }

  timer: any;

  toggleLiveUpdate() {
    if (this.liveUpdateTimer === undefined) {
      //this.liveUpdateTimer = 0;
      this.liveUpdateEnabled = false;
      console.log('start liveupdate for first time');
    }
    this.liveUpdateEnabled = !this.liveUpdateEnabled;

    if (this.liveUpdateTimer) {
      console.log('clear liveupdate timer');
      clearInterval(this.liveUpdateTimer);
    }
    if (this.liveUpdateEnabled) {
      //this.randomUpdate();
      console.log('start liveupdate timer');
      this.liveUpdateTimer = setInterval(() => { this.randomUpdatex(this) }, this.timerDuration);
    }

    return this.liveUpdateEnabled;
  }

  randomUpdate() {
    this.randomUpdatex(this);
  }
  randomUpdatex(_this: BigGrid) {
    const data = _this.grid.data;
    const rn = Math.floor(Math.random() * this.grid.data.length);

    const r = data[rn] as LooseType;

    //console.log(r);

    _this.dataService.updateItem(r, _this.colCount, Math.floor(Math.random() * _this.colCount));

    //console.log(r);

    _this.grid.data = data;
    if(_this.liveSort) {
      //let se =_this.grid.sortingExpressions;
      _this.grid.sort(_this.grid.sortingExpressions);  
    }

  }

  setGridColumnProps(_this: BigGrid) {
    console.log(_this.grid);
    const expectedCol:number = (2* _this.colCount / 2 + 1);
    if(_this.grid.columns.length < expectedCol) {
      console.log(`grid data not ready: ${_this.grid.columns.length} / ${expectedCol}`);
      this.timer = setTimeout(() => this.setGridColumnProps(this), 1000);
      return;
    }
    else {
      console.log(`grid data ready: ${_this.grid.columns.length} / ${expectedCol}`);
    }
    const summ = [];
    //summ = [];
    const popluateCols = !_this.cols || _this.cols.length === 0;
    if(popluateCols) {
      _this.cols = [];
    }
    //return;
    _this.grid.columns.forEach(c => {

      if (popluateCols && c.index > 1) {
        _this.cols.push(c.dataType);
      }

      if (c.index <= 2) {
        c.pinned = true;
        c.sortable = true;
      }
      else {
        c.sortable = Math.random() > 0.5;
      }
      c.minWidth = '60';
      c.resizable = true;
      switch (c.dataType) {
        case 'number':
            c.hasSummary = true;
            summ.push({fieldName: c.header});
          break;
        case 'string':
          c.hasSummary = false;
          break;
        case 'boolean':
          c.hasSummary = false;
          c.cellClasses = this.booleanCellClasses;
          break;
        case 'date':
        default:
          //c.hasSummary = true;
          c.formatter = ((v :Date) => this.dateFormat(v, Math.random() > 0.3));
          //c.formatter = ((v :Date) => _this.dateFormat(v, true));
          break;
      }
      c.autosize();
      //setTimeout(c.autosize, 1000);
    });
    if(summ.length > 0)
    _this.grid.enableSummaries(summ);

    _this.isLoading = false;
    console.log(_this.cols);
  }


  fetchData() {
    //this.grid.data = this.hugeData;
    this.isLoading = true;
    console.log('fetchData');
    this.hugeData.subscribe((d) => {
      //console.log(`fetching: ${d}`);
      this.lastDataFetchTime = new Date();
      this.timer = setTimeout(() => this.setGridColumnProps(this), 1000);
      this.isLoading = false;
    },
      (e) => { console.log(`error: ${e}`) },
      () => { console.log('Completed'); this.isLoading = false; }
    );

  }

  reloadData() {
    console.log('reloadData');
    this.isLoading = true;
    //this.grid.data = [];
    this.hugeData = this.dataService.getData(this.colCount, this.rowCount, this.cols);
    //this.grid.data = this.hugeData.;
    this.isLoading = false;
    this.lastDataFetchTime = new Date();
    this.setGridColumnProps(this);

    return;
    this.hugeData.subscribe((d) => {
      this.grid.data = d;
      this.isLoading = false;
      this.lastDataFetchTime = new Date();
      this.setGridColumnProps(this);
    },
      (e) => { console.log(`error: ${e}`) },
      () => { console.log('Completed'); this.isLoading = false; }
    );

  }

  toggleDarkTheme() {
    //this.themesClass = this.themesClass === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
  }

  toggleLiveSort() {
    this.liveSort = !this.liveSort;
  }


  private trueValueCondition = (rowData: any, columnKey: any): boolean => {
    return rowData[columnKey];
}

private falseValueCondition = (rowData: any, columnKey: any): boolean => {
    return !rowData[columnKey];
}

booleanCellClasses = { 
  cellBoolTrue: this.trueValueCondition,
  cellBoolFalse: this.falseValueCondition
}

dateFormat(value: Date, friendly: boolean) {
  let durationDay = ( Date.now().valueOf() - value.valueOf() ) / (1000 * 60 * 60 * 24);
  if(friendly)
  {
    if(durationDay < 1 && durationDay > -1 ) {
      return this.timeFormat(value, friendly);
    }
    durationDay = Math.floor(durationDay);
    if(durationDay < 30 && durationDay > 0 ) {
      return Math.abs(durationDay) + ' days ago';
    }
    if(durationDay > -30 && durationDay < 0 ) {
      return Math.abs(durationDay) + ' days to go';
    }
    return durationDay + ' days away';  
  }
  else{
    if(durationDay < 1 && durationDay > -1 ) {
      return this.timeFormat(value, friendly);
    }
  }
    return formatDate(value, 'yy-MM-dd', 'en-us')
}

timeFormat(value: Date, friendly: boolean) {
  const durationHr = ( Date.now() - value.valueOf() ) / (1000 * 60 * 60);
  if(friendly)
  {
    if((durationHr * 60 * 60) < 10 && (durationHr* 60 * 60) > -10 ) {
      return 'Now';
    }
    if((durationHr * 60 * 60) < 60 && (durationHr* 60 * 60) > -60 ) {
      return 'Just now';
    }
    const durationMin = Math.abs(Math.floor(durationHr * 60));
    if(durationHr < 1 && durationHr > 0 ) {
      return `${durationMin} min${(durationMin > 1) ? 's' : '' } ago`;
    }
    if(durationHr > -1 && durationHr < 0 ) {
      return `${durationMin} min${(durationMin > 1) ? 's' : '' } to go`;
    }
    if(durationHr < 1 && durationHr > -1 ) {
      return 'Less than an hour';
    }
    if(durationHr < -1 && durationHr > 1 ) {
      return 'More than an hour';
    }
    return `${Math.floor(durationHr)} hour${(durationHr > 2 || durationHr < -2) ? 's' : '' } away`;
  }
  else {
    return formatDate(value, 'HH:mm', 'en-us')
  }
}


}


// export enum THEME {
//   LIGHT = "light-theme",
//   DARK = "dark-theme",
//   BLACK = "black-theme"
// }



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

