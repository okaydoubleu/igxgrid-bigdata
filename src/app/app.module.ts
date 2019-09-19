import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IgxCarouselModule, IgxGridModule } from 'igniteui-angular';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, IgxCarouselModule, IgxGridModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
