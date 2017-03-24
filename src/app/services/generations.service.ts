import { Injectable, EventEmitter, Output } from '@angular/core';

export interface cell {
  alive: boolean;
  intensity: number;
}

export const MAX_INTENSITY = 255;
export const MIN_INTENSITY = 29;
const DECAY_RATE = 24;

@Injectable()
export class GenerationsService {

  genMinus1: string;
  genMinus2: string;
  stagnation: boolean;

  @Output() onStagnation = new EventEmitter<undefined>();

  constructor() { }

  createFreshGeneration(noRows, noCols): cell[][] {

    this.genMinus1 = '';
    this.genMinus2 = '';
    this.stagnation = false;

    let cells = [];
    for (let i=0; i<noRows; i++) {
      let row = [];
      for (let j=0; j<noCols; j++) {
        let alive = !!(Math.round(Math.random()));
        row.push({
          alive: alive,
          intensity: (alive ? MAX_INTENSITY : MIN_INTENSITY)
        });
      }
      cells.push(row);
    }
    return cells;
  }

  createFreshSpace(noRows, noCols): cell[][] {

    this.genMinus1 = '';
    this.genMinus2 = '';
    this.stagnation = false;

    let cells =[];
    for (let i=0; i<noRows; i++) {
      let row = [];
      for (let j=0; j<noCols; j++) {
        row.push({alive: false});
      }
      cells.push(row);
    }
    return cells;
  }

  nextGen(cells: cell[][]){

    if (!this.stagnation) this.checkStagnation(cells);

    let nextGen = this.cloneGen(cells);

    for (var i = 0; i < cells.length; i++) {
      for (var j = 0; j < cells[i].length; j++) {
      
        let amoutNeightbours = this.countNeightbours(cells, i, j);
        
        if (cells[i][j].alive) {
          if (amoutNeightbours < 2 || amoutNeightbours > 3) {
            // Dying
            nextGen[i][j].alive = false;
            nextGen[i][j].intensity = MAX_INTENSITY - DECAY_RATE;
          } else {
            // Surviving
            nextGen[i][j].alive = true;
            nextGen[i][j].intensity = MAX_INTENSITY;
          }
        } else {
          if (amoutNeightbours === 3) {
            // Born
            nextGen[i][j].alive = true;
            nextGen[i][j].intensity = MAX_INTENSITY;
          } else if (cells[i][j].intensity > (MIN_INTENSITY+DECAY_RATE)) {
            nextGen[i][j].intensity = cells[i][j].intensity - DECAY_RATE;
          } else {
            nextGen[i][j].intensity = MIN_INTENSITY;
          }
        }
      }
    }
    return nextGen;
  }

  resetStagnation() {
    this.stagnation = false;
  }

  private cloneGen(cells: cell[][]) {
    return JSON.parse(JSON.stringify(cells));
  }

  private countNeightbours(cells, i, j): number {
    let cnt = 0;
    if (cells[i-1] && cells[i-1][j-1] && cells[i-1][j-1].alive) cnt++;
    if (cells[i-1] && cells[i-1][j] && cells[i-1][j].alive) cnt++;
    if (cells[i-1] && cells[i-1][j+1] && cells[i-1][j+1].alive) cnt++;
    if (cells[i] && cells[i][j-1] && cells[i][j-1].alive) cnt++;
    if (cells[i] && cells[i][j+1] && cells[i][j+1].alive) cnt++;
    if (cells[i+1] && cells[i+1][j-1] && cells[i+1][j-1].alive) cnt++;
    if (cells[i+1] && cells[i+1][j] && cells[i+1][j].alive) cnt++;
    if (cells[i+1] && cells[i+1][j+1] && cells[i+1][j+1].alive) cnt++;
    return cnt;
  }

  private checkStagnation(newCells: cell[][]) {

    let currentGen = this.serializeGeneration(newCells);
    
    if (currentGen === this.genMinus1 || currentGen === this.genMinus2) {
      this.stagnation = true;
      this.onStagnation.emit();
    }

    this.genMinus2 = this.genMinus1;
    this.genMinus1 = currentGen;
  }

  private serializeGeneration(cells: cell[][]): string {
    return JSON.stringify(cells);
  }
}
