import { Component, Input } from '@angular/core';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent {
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

  @Input()
  audioPaths: string[] = [
    'assets/audio/tri_medvedya.mp3',
    'assets/audio/kashka_iz_topora.mp3',
  ];

  private audio = new Audio();

  playingAudio = '';
  isMuted = false;
  isPaused = true;
  isRepeat = false;
  volumeProc = 100;
  volumeNow = 100;
  clear: any;
  totalMinutes = '';
  currentMinutes = '';
  currentSeconds = 0;
  currentMove = 0;

  constructor() {
    this.audio.src = this.audioPaths[1];
    this.playingAudio = this.audioPaths[1].split('/')[2];
    this.audio.currentTime = this.currentSeconds;
  }

  public control() {
    this.audio.paused ? this.audio.play() : this.audio.pause();

    this.isPaused = this.audio.paused;
    this.totalMinutes = this.secondsToMinutes(Math.ceil(this.audio.duration));

    if (this.isPaused) {
      this.clear();
      return;
    }

    this.clear = this.nextTick(() => {
      if (this.audio.ended) {
        this.currentMove = 0;
        this.currentSeconds = 0;

        if (this.isRepeat) {
          return this.audio.play();
        }
        if (!this.isRepeat) {
          this.isPaused = true;
          return this.clear();
        }
      }
      this.currentSeconds++;
      this.currentMove = Math.floor(
        this.currentSeconds / (this.audio.duration / 100)
      );
      this.currentMinutes = this.secondsToMinutes(this.currentSeconds);
    });
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

  public nextTick(doStep: () => void, time = 1000) {
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

  public next() {}

  public prev() {}
}
