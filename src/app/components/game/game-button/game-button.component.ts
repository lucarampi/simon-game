import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-button',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.css']
})
export class GameButtonComponent implements OnInit {
  @Input()
  color!: string;
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    console.log(`Clicked color: ${this.color}`)
  }
}
