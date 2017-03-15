import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
    HttpModule
  ],
  providers: [
    GenerationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
