import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Data } from 'src/types/types';
@Component({
  selector: 'c-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input()
  audioData: Data[];

  @Input()
  playNow: Data;

  @Output()
  audioEvent = new EventEmitter<number>();

  displayedColumns: string[] = ['id', 'name', 'control'];

  setAudio(event: Event) {
    const btn = event.target as HTMLButtonElement;

    this.audioEvent.emit(parseInt(btn.id));
  }
}
