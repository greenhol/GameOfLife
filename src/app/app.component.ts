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
    this.universe.clear();
  }

  restartUniverse() {
    this.universe.restart();
  }
}
