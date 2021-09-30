import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { COLORS, START_COUNT } from '../models'

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  simon: string[] = [];
  player: string[] = [];
  count: number;
  state = new Subject<any>();

  constructor() {
    this.count = START_COUNT;
  }

  private get randomColor(): string {
    return COLORS[Math.floor(Math.random() * 3.9)];
  }

  appendSimon(incremtent: boolean = false): void {
    if (incremtent) {
      this.count++;
    }
    this.simon.push(this.randomColor);
  }

  generateSimon(): string[] {
    for (let i = 0; i < this.count; i++) {
      this.appendSimon();
    }
    this.setState();
    return this.simon;
  }

  restartSimon(): string[] {
    this.count = START_COUNT;
    return this.generateSimon();
  }

  playerGuess(guess: string) {
    this.player.push(guess)
    if (!this.comparePlayerSimom()) {
      this.player = [];
    }
    this.setState();
  }

  updateGame(){
    this.appendSimon(true);
    this.player = []
  }

  comparePlayerSimom(): boolean {
    this.player.forEach((element, index) => {
      if (element !== this.simon[index]) {
        return false;
      }
    })
    if(this.player.length === this.simon.length){
      this.updateGame()
    }
    return true;
  }

  setState() {
    this.state.next({
      player: this.player,
      simon: this.simon,
      count: this.count
    })
  }
}
