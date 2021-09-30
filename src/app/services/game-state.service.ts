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
    console.log("RANDOM COLOR")
    return COLORS[Math.floor(Math.random() * 3.9)];
  }

  appendSimon(incremtent: boolean = false): void {
    if (incremtent) {
      this.count++;
    }
    this.simon.push(this.randomColor);
    console.log("APPENDING")
  }

  generateSimon(): string[] {
    console.log("GENERATING")

    for (let i = 0; i < this.count; i++) {
      this.appendSimon();
    }
    this.setState();
    return this.simon;
  }

  restartSimon(): string[] {
    console.log("RESTARTING")
    this.count = START_COUNT;
    this.player = [];
    this.simon =[];
    return this.generateSimon();
  }

  playerGuess(guess: string) {
    this.player.push(guess)
    if (!this.comparePlayerSimom()) {
      this.restartSimon()
    }
    console.log(this.simon)
    this.setState();
  }

  updateGame() {
    console.log("UPDATING")
    this.appendSimon(true);
    this.player = []
  }

  comparePlayerSimom(): boolean {
    console.log("COMPARING")
    for (let i = 0; i < this.player.length; i++) {
      if (this.player[i] !== this.simon[i]) {
        console.log("WRONG")
        return false;
      }
    }
    console.log("RIGHT")
    if (this.player.length === this.simon.length) {
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
