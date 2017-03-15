import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { GenerationsService } from 'app/services/generations.service';

// const NO_COLS = 4;
// const NO_ROWS = 3;

const NO_COLS = 70;
const NO_ROWS = 34;

@Component({
  selector: 'gol-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.scss']
})
export class UniverseComponent implements OnInit, OnDestroy {

  cells: boolean[][];
  timer: Observable<number>;  
  tickSub: Subscription;
  stagnation: boolean;

  constructor(private generationsService: GenerationsService) {
    this.cells = generationsService.createFreshGeneration(NO_ROWS, NO_COLS);
  }

  ngOnInit() {
    this.startEvolving();

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
    this.startEvolving();
  }

  private startEvolving() {
    this.timer = Observable.timer(1000, 1000);
    this.tickSub = this.timer.subscribe(()=> {
      this.cells = this.generationsService.nextGen(this.cells);
    });
  }
}
