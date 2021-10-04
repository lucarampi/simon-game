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
  audio = new Audio()
  // audio_red = new Audio("./assets/audios/red.mp3")
  // audio_yellow = new Audio("./assets/audios/yellow.mp3")
  // audio_blue = new Audio("./assets/audios/purple.mp3")
  // audio_green = new Audio("./assets/audios/green.mp3")
  // audio_wrong = new Audio("./assets/audios/wrong.mp3")


  constructor() {
    this.count = START_COUNT;
    this.audio.load()
    // this.audio_red.load()
    // this.audio_yellow.load()
    // this.audio_blue.load()
    // this.audio_green.load()
    // this.audio_wrong.load()
    // this.audio.autoplay
    // this.audio.autoplay
    // this.audio_red.autoplay
    // this.audio_yellow.autoplay
    // this.audio_blue.autoplay
    // this.audio_green.autoplay
    // this.audio_wrong.autoplay
  }

  private get randomColor(): string {
    console.log("RANDOM COLOR")
    return COLORS[Math.floor(Math.random() * 3.9)];
  }

  getAccess(): Config {
    const config = localStorage['session'];
    return config ? JSON.parse(config) : false;
  }

  checkAccess(): void {
    let curr_config = this.getAccess()
    if (!curr_config) {
      curr_config = new Config()
      console.log("CONFIG CREATED")
      if (JSON.stringify(curr_config) != undefined) {
        localStorage['session'] = JSON.stringify(curr_config);
      }
    }
  }

  toggleMuted(): boolean {
    let config = this.getAccess()
    config.muted = !config.muted
    // this.audio_red.muted = config.muted
    // this.audio_yellow.muted = config.muted
    // this.audio_blue.muted = config.muted
    // this.audio_green.muted = config.muted
    // this.audio_wrong.muted = config.muted
    this.audio.muted = config.muted
    localStorage['session'] = JSON.stringify(config);
    return config.muted
  }

  firstStart(): void {
    let config = this.getAccess();
    config.is_first_access = false;
    localStorage['session'] = JSON.stringify(config);
  }
  isFirstStart(): boolean {
    let config = this.getAccess();
    return config.is_first_access
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
    this.player.push(guess)
    if (!this.comparePlayerSimom()) {
      this.audioButton('wrong');

    } else {
      this.audioButton(guess);
    }
    this.setState();
  }

  setPlaying(status: boolean): void {
    let config = this.getAccess()
    config.playing = status;
    localStorage['session'] = JSON.stringify(config);
  }

  getPlaying(): boolean {
    let config = this.getAccess();
    return config.playing
  }

  async audioButton(guess: string) {
    this.audio.src = "./assets/audios/" + guess + ".mp3";
    this.audio.load();
    await this.audio.play();
  }

  updateGame() {
    console.log("UPDATING")
    this.appendSimon(true);
    this.player = []
  }

  comparePlayerSimom(): boolean {
    let config = this.getAccess()
    console.log("COMPARING")
    for (let i = 0; i < this.player.length; i++) {
      if (this.player[i] !== this.simon[i]) {
        console.log("WRONG")
        config.playing = false;
        localStorage['session'] = JSON.stringify(config);
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
