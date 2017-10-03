import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyMaterialModule } from './my-material.module';
import 'hammerjs';

import { AppComponent } from './app.component';
import { UniverseComponent } from './universe/universe.component';
import { GenerationsService } from './services/generations.service';

@NgModule({
  declarations: [
    AppComponent,
    UniverseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    GenerationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
