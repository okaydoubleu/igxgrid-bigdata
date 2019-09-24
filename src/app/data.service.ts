import { Injectable } from '@angular/core';
import { Observable, from, pipe } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class DataService {
  
    constructor() {}

    public getData(colCount: number, rowCount: number, 
        currCols?: Array<string>): Observable<Array<LooseType>> {
      return Observable.create(observer => {
        observer.next(this.getFreshData(colCount, rowCount, currCols));
        observer.complete();
      });
    }
   
    private getFreshData(colCount: number, rowCount: number, currCols?: Array<string>) :Array<LooseType> {
      let data: Array<LooseType>;
      data = [];
      console.log(currCols);
      let cols: Array<string>;
      if (currCols && currCols.length > 0) {
        cols = currCols;
      }
      else {
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
                eval(`row.col${c}=${this.makeBool()}`);
              break;
            case colTypeDate:
                let d = this.makeDate();
                eval(`row.col${c}= new Date(${d.getFullYear()},${d.getMonth()},${d.getDate()},${d.getHours()},${d.getMinutes()},${d.getSeconds()},${d.getMilliseconds()}, )`);
              break;
          }
        }
        data.push(row);
      }
  
      return data;
    }
  
    static characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-. *';
  
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


   updateItem(item: LooseType, colMax: number, numberToChange: number): LooseType {
    for(let i = 0; i < numberToChange; i++) {
      let y = Math.floor(Math.random() * colMax);
      let x: any;
      //console.log(`x = item.col${y}`);
      eval(`x = item.col${y}`);
      let evalString: string;
      //console.log(`value: ${x}\ttype: ${typeof(x)}`);
      switch(typeof(x)) {
        case 'number':
            evalString = `item.col${y} = ${this.makeNumber(Math.floor(Math.random() * 1000))}`;
         break;
         case 'boolean':
            evalString = `item.col${y} = ${this.makeBool()}`;
         break;
         case 'string':
            evalString = `item.col${y} = '${this.makeString(Math.floor(Math.random() * 20))}'`;
         break;
         default:
           let d = this.makeDate();
           evalString = `item.col${y}= new Date(${d.getFullYear()},${d.getMonth()},${d.getDate()},${d.getHours()},${d.getMinutes()},${d.getSeconds()},${d.getMilliseconds()}, )`;
         break;
      }
      //console.log(evalString);
      eval(evalString);
    }
    item.updated = new Date();
    return item;
   }

  }
  
  export interface LooseType {
    sn?: number,
    updated?: Date,
    [key: string]: any
  }


  
const colTypeNumber = 'number';
const colTypeString = 'string';
const colTypeBool = 'boolean';
const colTypeDate = 'date';
  