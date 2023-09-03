import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  audioPath: string = 'assets/audio/';

  data: string[] = [
    'tri_medvedya.mp3',
    'kashka_iz_topora.mp3',
    'tolstoj-lev-i-sobachka.mp3',
    'kurochka_ryaba.mp3',
  ].map((item) => this.audioPath + item);
}
