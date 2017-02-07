import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FlyPickerModule } from 'fly-picker2';

import { AppComponent } from './app.component';

@NgModule({
  imports: [ BrowserModule, FlyPickerModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
