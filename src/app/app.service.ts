import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  numberOfCards: number;
  tempNumbers = [];
  constructor() { }

  getRandomInt(min, max) {
    let result: number;
    let exists = true;
    min = Math.ceil(min);
    max = Math.floor(max);
    while (exists) {
      result = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!this.tempNumbers.find(no => no === result.toString())) {
        exists = false;
        this.tempNumbers.push(result.toString());
      }
    }
    return result;
  }
}
