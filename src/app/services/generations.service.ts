import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class GenerationsService {

  genMinus1: string;
  genMinus2: string;
  stagnation: boolean;

  @Output() onStagnation = new EventEmitter<undefined>();

  constructor() { }

  createFreshGeneration(noRows, noCols): boolean[][] {

    this.genMinus1 = '';
    this.genMinus2 = '';
    this.stagnation = false;

    let cells =[];
    for (let i=0; i<noRows; i++) {
      let row = [];
      for (let j=0; j<noCols; j++) {
        row.push(!!(Math.round(Math.random())));
      }
      cells.push(row);
    }
    return cells;
  }

  nextGen(cells: boolean[][]){

    if (!this.stagnation) this.checkStagnation(cells);

    let nextGen = this.cloneGen(cells);

    for (var i = 0; i < cells.length; i++) {
      for (var j = 0; j < cells[i].length; j++) {
      
        let amoutNeightbours = this.countNeightbours(cells, i, j);
        
        if (cells[i][j]) {
          if (amoutNeightbours < 2 || amoutNeightbours > 3) {
            // Dying
            nextGen[i][j] = false;
          } else {
            // Surviving
            nextGen[i][j] = true;
          }
        } else {
          if (amoutNeightbours === 3) {
            // Born
            nextGen[i][j] = true;
          }
        }
      }
    }
    return nextGen;
  }

  private cloneGen(cells: boolean[][]) {
    let clone = [];
    for (var i = 0; i < cells.length; i++) {
      let row = [];
      for (var j = 0; j < cells[i].length; j++) {
        row.push(cells[i][j]);
      }
      clone.push(row);
    }
    return clone;
  }

  private countNeightbours(cells, i, j): number {
    let cnt = 0;
    if (cells[i-1] && cells[i-1][j-1]) cnt++;
    if (cells[i-1] && cells[i-1][j]) cnt++;
    if (cells[i-1] && cells[i-1][j+1]) cnt++;
    if (cells[i] && cells[i][j-1]) cnt++;
    if (cells[i] && cells[i][j+1]) cnt++;
    if (cells[i+1] && cells[i+1][j-1]) cnt++;
    if (cells[i+1] && cells[i+1][j]) cnt++;
    if (cells[i+1] && cells[i+1][j+1]) cnt++;
    return cnt;
  }

  private checkStagnation(newCells: boolean[][]) {

    let currentGen = this.serializeGeneration(newCells);
    
    if (currentGen === this.genMinus1 || currentGen === this.genMinus2) {
      this.stagnation = true;
      this.onStagnation.emit();
    }

    this.genMinus2 = this.genMinus1;
    this.genMinus1 = currentGen;
  }

  private serializeGeneration(cells: boolean[][]): string {
    return JSON.stringify(cells);
  }
}
