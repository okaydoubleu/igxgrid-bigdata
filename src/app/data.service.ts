import { Injectable } from '@angular/core';
import { Observable, from, pipe } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class DataService {
  
    constructor() {}

    public getData(colCount: number, rowCount: number) {    
      return Observable.create(observer => {
        observer.next(this.getFreshData(colCount, rowCount));
        observer.complete();
      });
    }
   
    private getFreshData(colCount: number, rowCount: number) {
      let data: Array<LooseType>;
      data = [];
      let cols: Array<string>;
      cols = [];
      for (var c = 0; c < colCount; c++) {
        switch (Math.floor(Math.random() * 6)) {
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
      for (var r = 0; r < rowCount; r++) {
  
        let row: LooseType = {sn: r, updated: new Date()};
        for (var c = 0; c < colCount; c++) {
          switch (cols[c]) {
            case colTypeNumber:
                //eval('row.'+'col'+c+'=' + Math.floor(Math.random() * 1000));
                eval(`row.col${c}=${this.makeNumber(10000)}`);
                break;
            case colTypeString:
                eval(`row.col${c}='${this.makeString(Math.floor(Math.random() * 20))}'`);
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
      var charactersLength = DataService.characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += DataService.characters.charAt(Math.floor(Math.random() * charactersLength));
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
    sn?: number,
    updated?: Date,
    [key: string]: any
  }

  
const colTypeNumber = 'number';
const colTypeString = 'string';
const colTypeBool = 'bool';
const colTypeDate = 'date';
  