import { Component, Input } from '@angular/core';
@Component({
  selector: 'mat-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() data;

  constructor() {
    console.log(this.data);
  }
}
