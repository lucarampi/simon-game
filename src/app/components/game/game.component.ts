import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { sleep } from 'src/app/models';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  count?: number;
  system_colors: any = {
    red: false,
    blue: false,
    green: false,
    yellow: false
  }


  constructor(private game: GameStateService) { }

  ngOnInit(): void {
    /**Every time state is updated, do this:
     *  */
    this.game.state.subscribe(state => {
      console.log(state);
      if (this.count != state.count) {
        this.count = state.count;
        this.teasePlayer(state.simon);
      }
    });
    this.game.generateSimon();
  }

  playerGuess(guess: string) {
    this.game.playerGuess(guess);
  }

  async teasePlayer(simon: string[]) {
    for (let i = 0; i < simon.length; i++) {
      await sleep(300);
      this.system_colors[simon[i]] = true;
      await sleep(500);
      this.system_colors[simon[i]] = false;
      await sleep(200);

    }
  }

}
