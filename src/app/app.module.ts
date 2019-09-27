import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BigGrid } from './big-grid.component';

import { IgxCarouselModule, IgxGridModule, IgxToggleModule, 
  IgxRippleModule, IgxSwitchModule, IgxSliderModule, IgxLayoutModule, IgxExcelExporterService } from 'igniteui-angular';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';



const appRoutes: Routes = [
  { path: 'big-data', component: AppComponent },
  { path: '',   redirectTo: '/big-data', pathMatch: 'full' }
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    IgxCarouselModule, 
    IgxGridModule, 
    IgxToggleModule, 
    IgxRippleModule,
    IgxSwitchModule,
    IgxSliderModule,
    IgxLayoutModule,
  ],
  declarations: [AppComponent, HelloComponent, BigGrid],
  bootstrap: [AppComponent],
  providers: [DataService, IgxExcelExporterService],
})
export class AppModule { }

