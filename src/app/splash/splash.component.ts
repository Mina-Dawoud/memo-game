import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent {
  cardsCategories = [10, 20, 30, 40];

  constructor(private router: Router, public appService: AppService) {
    this.appService.numberOfCards = this.cardsCategories[0];
  }

  openMemoGame() {
    this.router.navigate(['/memo']);
  }
}
