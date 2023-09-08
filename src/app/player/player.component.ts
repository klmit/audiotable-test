import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Data } from 'src/types/types';

@Component({
  selector: 'c-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnChanges {
  @Input('playNow') playNow: Data;
  @Input('audioData') audioData: Data[];

  icons = {
    playIcon: 'assets/images/play.svg',
    nextIcon: 'assets/images/next.svg',
    prevIcon: 'assets/images/prev.svg',
    volumeIcon: 'assets/images/volume.svg',
    listIcon: 'assets/images/list.svg',
    repeatIcon: 'assets/images/repeat.svg',
    pauseIcon: 'assets/images/pause.svg',
    volumeMutedIcon: 'assets/images/volume_muted.svg',
  };

  private readonly audio = new Audio();

  playingAudio = '';
  isMuted = false;
  isPaused = true;
  isRepeat = false;
  volumeProc = 100;
  volumeNow = 100;
  clear: () => void;
  totalMinutes = '';
  currentMinutes = '';
  currentSeconds = 0;
  currentMove = 0;

  constructor() {}

  ngOnChanges(): void {
    this.setAudio();
  }

  setAudio() {
    this.currentMove = 0;
    this.currentSeconds = 0;
    this.audio.src = this.playNow.path;
    this.playingAudio = this.playNow.name;
    this.playPause();
  }

  public playPause() {
    this.audio.paused ? this.audio.play() : this.audio.pause();
    this.isPaused = this.audio.paused;

    if (this.audio.paused) {
      return this.clearTick();
    }

    if (this.audio.src !== this.playNow.path) {
      this.clearTick();
    }

    this.initialTick();
  }

  private initialTick() {
    this.clear = this.nextTick(() => {
      if (this.audio.ended) {
        return this.ended();
      }
      this.tick();
    });
  }

  private tick() {
    this.currentSeconds++;
    this.currentMove = Math.floor(
      this.currentSeconds / (this.audio.duration / 100)
    );
    this.currentMinutes = this.secondsToMinutes(this.currentSeconds);
    this.totalMinutes = this.secondsToMinutes(Math.ceil(this.audio.duration));
  }

  public clearTick() {
    console.log(this.clear);
    if (typeof this.clear === 'function') this.clear();
  }

  public ended() {
    if (this.isRepeat) {
      this.currentMove = 0;
      this.currentSeconds = 0;
      this.clearTick();
      this.setAudio();
    } else {
      this.clearTick();
      this.isPaused = true;
    }
  }

  public volume(event: Event) {
    const input = event.target as HTMLInputElement;

    this.audio.volume = parseInt(input.value) / 100;
    this.volumeNow = this.audio.volume * 100;
    this.volumeProc = Math.ceil((100 / 100) * this.volumeNow);
    this.audio.volume === 0 ? (this.isMuted = true) : (this.isMuted = false);
  }

  public mute() {
    this.audio.volume = !this.isMuted ? 0 : 1;
    this.isMuted = !this.isMuted;
  }

  public canculateTick(event: Event) {
    const input = event.target as HTMLInputElement;

    this.audio.currentTime =
      parseInt(input.value) * (this.audio.duration / 100);

    this.currentSeconds = Math.ceil(this.audio.currentTime);
  }

  private nextTick(doStep: () => void, time = 1000) {
    let nextAt: number, timeout: any;
    nextAt = new Date().getTime() + time;

    const wrapper = () => {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      doStep();
    };

    timeout = setTimeout(wrapper, nextAt - new Date().getTime());

    const clear = () => clearTimeout(timeout);

    return clear;
  }
  public repeat() {
    this.isRepeat = !this.isRepeat;
  }

  public secondsToMinutes(totalSeconds: number) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    let seconds = totalSeconds % 60;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    const time = [hours, minutes, seconds].map((item) =>
      item < 10 ? `0${item}` : `${item}`
    );

    return `${time[1]}:${time[2]}`;
  }

  public next() {
    this.playNow = this.audioData[this.playNow.id + 1] || this.playNow;
    this.setAudio();
  }

  public prev() {
    this.playNow = this.audioData[this.playNow.id - 1] || this.playNow;
    this.setAudio();
  }
}
