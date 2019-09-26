import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Routes, Router, NavigationExtras } from '@angular/router';
import { take, takeLast } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  //   styles: [`p {
  //   font-family: Lato;
  // }` ]
})
export class AppComponent {
  name = 'Big-Data';
  rowCount = 100;
  colCount = 5;
  liveUpdateInterval = 100;
  rowCountActive = 100;
  colCountActive = 5;
  liveUpdateIntervalActive = 100;
  displayGrid = false;
  

  @HostBinding("class")
  public themesClass: THEME = THEME.LIGHT;


  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      const rows = params[GRIDPARAM.ROWS];
      //console.log('XXXXXXXXXXXX ' + rows);
      const cols = params[GRIDPARAM.COLS];
      //console.log('XXXXXXXXXXXX ' + cols);
      const intv = params[GRIDPARAM.INTV];
      //console.log('XXXXXXXXXXXX ' + intv);

      
      if (rows && cols && intv) {
        this.colCount = parseInt(cols);
        this.rowCount = parseInt(rows);
        this.liveUpdateInterval = parseInt(intv);
      }
      else {

      }
      this.colCountActive = this.colCount;
      this.rowCountActive = this.rowCount;
      this.liveUpdateIntervalActive = this.liveUpdateInterval;
      //this.displayGrid = true;
    });

  
  }
  ngOnInit() {
    console.log('ngOnInit');
    setTimeout(() => {
      console.log('switching on the grid')
    this.displayGrid = true;
    }, 100);
  }

  reload() {


    let navigationExtras: NavigationExtras = {
      queryParams: { 'rows': this.rowCount, 'cols': this.colCount, 'intv': this.liveUpdateIntervalActive }
    };
    const o = this.router.navigate(['big-data'], navigationExtras);
    o.then((ok) => {
      if (ok) {
        this.displayGrid = false;
        console.log('nav success')
        setTimeout(() => {
          this.rowCountActive = this.rowCount;
          this.colCountActive = this.colCount;
          this.liveUpdateIntervalActive = this.liveUpdateInterval;
          this.displayGrid = true;

        }, 500);
      }
    })
  }

  countsAreDirty() {
    return !(this.colCount === this.colCountActive
      && this.rowCount === this.rowCountActive
      && this.liveUpdateInterval === this.liveUpdateIntervalActive)
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

export enum GRIDPARAM {
  ROWS = "rows",
  COLS = "cols",
  INTV = "intv"
}

