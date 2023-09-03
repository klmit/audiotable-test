import { NgModule, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import {} from '@angular/material';

@NgModule({
  declarations: [AppComponent, PlayerComponent, TableComponent],
  imports: [
    BrowserModule,
    CommonModule,
    NoopAnimationsModule,
    MatTableModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
