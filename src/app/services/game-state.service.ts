import { Injectable } from '@angular/core';

import {COLORS, START_COUNT} from '../models'

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  simon: string[] = [];
  player: string[] = [];
  count: number;

  constructor() {
    this.count = START_COUNT;
   }

   private get randomColor():string{
    return COLORS[Math.floor(Math.random()*4)];
   }

   appendSimon(incremtent:boolean = false):void{
     if(incremtent){
      this.count++;
     }
     this.simon.push(this.randomColor);
   }

   generateSimon():string[]{
     for (let i = 0; i < this.count; i++) {
       this.appendSimon(); 
     }
     return this.simon;
   }

   restartSimon():string[]{
     this.count=START_COUNT;
     return this.generateSimon();
   }

   playerGuess(guess:string){
     this.player.push(guess)
     if(!this.comparePlayerSimom()){
      this.player = [];
     }
   }

   comparePlayerSimom():boolean{
     this.player.forEach((element,index) =>{
       if (element !== this.simon[index]){
         return false;
       }
     })
     return true;
   }
}
