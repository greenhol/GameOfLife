import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { GenerationsService } from 'app/services/generations.service';

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

  @Input() noCols: number;
  @Input() noRows: number;
  @Input() cellSize: number;

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
}
