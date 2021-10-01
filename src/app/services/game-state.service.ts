import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { COLORS, START_COUNT, Config } from '../models'

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

  getAccess():Config {
    const config = localStorage['session'];
    return config ? JSON.parse(config) : false;
  }

  checkAccess(): void {
    if (!this.getAccess()) {
      let config = new Config()
      console.log("CONFIG CREATED")

      if (JSON.stringify(config) != undefined) {
        localStorage['session'] = JSON.stringify(config);
      }
    }
  }

  firstStart(): void {
    let config = this.getAccess();
    console.log(config)
    config.is_first_access = false;
    console.log(config)
    localStorage['session'] = JSON.stringify(config);
  }

  appendSimon(incremtent: boolean = false): void {
    if (incremtent) {
      this.count++;
    }
    this.simon.push(this.randomColor);
    console.log("APPENDING")
  }

  generateSimon(): string[] {
    console.log("GENERATING SIMON")

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
    this.simon = [];
    return this.generateSimon();
  }

  playerGuess(guess: string) {
    this.audioButton(guess);
    this.player.push(guess)
    if (!this.comparePlayerSimom()) {
      this.audioButton('wrong');
      this.restartSimon()
    }
    this.setState();
  }

  audioButton(guess: string): void {
    let audio = new Audio()
    audio.autoplay

    switch (guess) {
      case 'red':
        audio.src = './assets/audios/red.mp3'
        audio.load();
        audio.play();
        break;

      case 'yellow':
        audio.src = './assets/audios/yellow.mp3'
        audio.load();
        audio.play();
        break;

      case 'blue':
        audio.src = './assets/audios/purple.mp3'
        audio.load();
        audio.play();
        break;

      case 'green':
        audio.src = './assets/audios/green.mp3'
        audio.load();
        audio.play();
        break;

      case 'wrong':
        audio.src = './assets/audios/wrong.mp3'
        audio.load();
        audio.play();
        break;
    }

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
