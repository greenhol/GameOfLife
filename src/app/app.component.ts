import { Component, ViewChild } from '@angular/core';
import { UniverseComponent } from './universe/universe.component';

@Component({
  selector: 'gol-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sideNavOpen = false;
  @ViewChild(UniverseComponent)
  private universe: UniverseComponent;

  noCols = 35;
  noRows = 17;
  cellSize = 20;
  showDecay = false;
  empty = false;

  openSideNav() {
    this.sideNavOpen = true;
    this.universe.pause();
  }

  onSideNavClosing() {
    this.sideNavOpen = false;
  }

  runUniverse() {
    this.sideNavOpen = false;
    this.universe.run();
  }

  clearUniverse() {
    this.empty = true;
    this.universe.clear();
  }

  restartUniverse() {
    this.empty = false;
    this.universe.restart();
  }

  isEmpty() {
    console.log(this.empty);  
    return this.empty;
  }

}
