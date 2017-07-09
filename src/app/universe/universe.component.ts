import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { GenerationsService, cell, MAX_INTENSITY, MIN_INTENSITY } from 'app/services/generations.service';

const GENERATION_DURATION = 200;

@Component({
  selector: 'gol-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.scss']
})
export class UniverseComponent implements OnInit, OnDestroy {

  public cells: cell[][];
  private timer: Observable<number>;  
  private tickSub: Subscription;
  private stagnation: boolean;
  private running: boolean;

  @Input() noCols: number;
  @Input() noRows: number;
  @Input() cellSize: number;
  @Input() showDecay: boolean;

  constructor(private generationsService: GenerationsService) {
  }

  ngOnInit() {
    this.cells = this.generationsService.createFreshGeneration(this.noRows, this.noCols);    
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
    this.cells = this.generationsService.createFreshGeneration(this.noRows, this.noCols);
  }

  clear() {
    this.stagnation = false;
    this.tickSub.unsubscribe();
    this.cells = this.generationsService.createFreshSpace(this.noRows, this.noCols);
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

  cellClicked(cell: cell) {
    if (this.running) return;
    this.stagnation = false;
    this.generationsService.resetStagnation();
    
    cell.alive = !cell.alive;
    cell.intensity = (cell.alive ? MAX_INTENSITY : MIN_INTENSITY)
  }

  getCellColor(cell) {
    let intensity = this.showDecay ? cell.intensity : cell.alive ? MAX_INTENSITY : MIN_INTENSITY;
    if (this.stagnation) {
      if (!cell.alive) return 0; 
      return 'rgb(' + intensity + ', 0, 0)';  
    }
    return 'rgb(' + intensity + ', ' + intensity + ', ' + intensity + ')';
  }
}
