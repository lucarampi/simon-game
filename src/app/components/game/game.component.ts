import { Component, OnInit } from '@angular/core';

import { Config, sleep } from 'src/app/models';
import { GameStateService, } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  count?: number;
  config: Config;
  system_colors: any = {
    red: false,
    purple: false,
    green: false,
    yellow: false
  }


  constructor(private gameService: GameStateService) { }

  ngOnInit(): void {
    /**Every time state is updated, do this:
     *  */
    this.gameService.state.subscribe(state => {
      console.log(state);
      if (this.count != state.count) {
        this.count = state.count;
        this.teasePlayer(state.simon);
      }
    });
    this.checkAccess();
    this.config = this.getAccess();
  }

  // generateSimon(): void {
  //   let config = this.getAccess()
  //   if (this.gameService.getPlaying() && config.is_first_access !== true) {
  //     this.gameService.generateSimon()
  //   }
  // }

  playerGuess(guess: string) {
    let config = this.getAccess();
    if (config.playing === true)
      this.gameService.playerGuess(guess);
  }

  checkAccess(): void {
    this.gameService.checkAccess()
  }

  getAccess(): Config {
    return this.gameService.getAccess()
  }

  gameStart(): void {
    if (this.gameService.isFirstStart()) {
      this.gameService.firstStart()
    }
    this.gameService.setPlaying(true);
    this.gameService.restartSimon();
    
    this.ngOnInit();
  }


  async teasePlayer(simon: string[]) {
    for (let i = 0; i < simon.length; i++) {
      await sleep(700);
      this.system_colors[simon[i]] = true;
      this.gameService.audioButton(simon[i])
      await sleep(500);
      this.system_colors[simon[i]] = false;

    }
  }

}
