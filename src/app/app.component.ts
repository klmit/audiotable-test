import { Component, Input, OnInit } from '@angular/core';
import { Data } from 'src/types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  audioPath: string = 'assets/audio/';

  audioData: Data[] = [
    'tri_medvedya.mp3',
    'kashka_iz_topora.mp3',
    'tolstoj-lev-i-sobachka.mp3',
    'kurochka_ryaba.mp3',
  ].map((item, id) => ({
    id: id,
    name: item,
    path: this.audioPath + item,
  }));

  playNow: Data = this.audioData[0];

  setAudio($event: number) {
    this.playNow =
      this.audioData.find((item) => item.id === $event) || this.playNow;
  }
}
