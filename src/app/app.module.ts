import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BigGrid } from './big-grid.component';

import { IgxCarouselModule, IgxGridModule, IgxToggleModule, IgxRippleModule, IgxSwitchModule } from 'igniteui-angular';
import { DataService } from './data.service';

@NgModule({
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    IgxCarouselModule, 
    IgxGridModule, 
    IgxToggleModule, 
    IgxRippleModule,
    IgxSwitchModule,
  ],
  declarations: [AppComponent, HelloComponent, BigGrid],
  bootstrap: [AppComponent],
  providers: [DataService]
})
export class AppModule { }
