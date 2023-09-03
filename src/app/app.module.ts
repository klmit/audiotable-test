import { NgModule, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [AppComponent, PlayerComponent, TableComponent],
  imports: [BrowserModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent, PlayerComponent],
})
export class AppModule {}
