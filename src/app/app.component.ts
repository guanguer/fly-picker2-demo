import { Component } from '@angular/core';

@Component({
  selector: 'root-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  startDate: string;
  endDate: string;
  message: string;

  onDateChanged(range) {
    this.startDate = range.start;
    this.endDate = range.end;
  }

  onSearchClick($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.message = `Searching flights from ${this.startDate} to ${this.endDate}`;
  }

}
