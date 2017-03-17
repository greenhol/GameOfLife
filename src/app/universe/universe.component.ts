import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { GenerationsService } from 'app/services/generations.service';

// const NO_COLS = 4;
// const NO_ROWS = 3;

const NO_COLS = 35;
const NO_ROWS = 17;
const GENERATION_DURATION = 200;

@Component({
  selector: 'gol-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.scss']
})
export class UniverseComponent implements OnInit, OnDestroy {

  private cells: boolean[][];
  private timer: Observable<number>;  
  private tickSub: Subscription;
  private stagnation: boolean;
  private running: boolean;

  constructor(private generationsService: GenerationsService) {
    this.cells = generationsService.createFreshGeneration(NO_ROWS, NO_COLS);
  }

  ngOnInit() {
    this.run();
    this.generationsService.onStagnation.subscribe(() => {
      this.stagnation = true;
    });
  }

  ngOnDestroy() {
    this.tickSub.unsubscribe();
  }

  restart() {
    this.stagnation = false;
    this.tickSub.unsubscribe();
    this.cells = this.generationsService.createFreshGeneration(NO_ROWS, NO_COLS);
  }

  clear() {
    this.stagnation = false;
    this.tickSub.unsubscribe();
    this.cells = this.generationsService.createFreshSpace(NO_ROWS, NO_COLS);
  }

  run() {
    this.running = true;
    this.timer = Observable.timer(GENERATION_DURATION, GENERATION_DURATION);
    this.tickSub = this.timer.subscribe(()=> {
      this.cells = this.generationsService.nextGen(this.cells);
    });
  }

  pause() {
    this.running = false;
    this.tickSub.unsubscribe();
  }

  toggle() {
    this.running ? this.pause() : this.run();
  }
}
