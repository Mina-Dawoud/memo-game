import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
interface Card { id: number; src: string; flip: string; clickable: boolean; }

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit {
  cards: Card[] = [];
  selectedCard_1: Card;
  selectedCard_2: Card;
  progress: number = 0;
  fullTrack: HTMLAudioElement;
  flipAudio: HTMLAudioElement;
  goodAudio: HTMLAudioElement;
  failAudio: HTMLAudioElement;
  gameOverAudio: HTMLAudioElement;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    if (!this.appService.numberOfCards) {
      this.router.navigate(['/']);
    } else {
      this.fullTrack = new Audio('/assets/audio/full-track.mp3');
      this.flipAudio = new Audio('/assets/audio/flip.mp3');
      this.goodAudio = new Audio('/assets/audio/good.mp3');
      this.failAudio = new Audio('/assets/audio/fail.mp3');
      this.gameOverAudio = new Audio('/assets/audio/game-over.mp3');
      this.fullTrack.loop = true;
      this.fullTrack.play();
      for (let index = 0; index < this.appService.numberOfCards / 2; index++) {
        this.cards.push({
          id: this.appService.getRandomInt(0, this.appService.numberOfCards),
          src: `/assets/images/${index}.jpg`,
          flip: '',
          clickable: true
        });
        this.cards.push({
          id: this.appService.getRandomInt(0, this.appService.numberOfCards),
          src: `/assets/images/${index}.jpg`,
          flip: '',
          clickable: true
        });
      }
      this.cards.sort((a, b) => a.id > b.id ? 1 : -1);
    }
  }

  toggleFlip(index) {
    const card = this.cards[index];
    if (card.clickable) {
      this.flip(card);
      this.selectCard(card);
    }
  }
  flip(card) {
    this.flipAudio.play();
    card.flip = card.flip === '' ? 'flip' : '';
  }
  selectCard(card) {
    if (!this.selectedCard_1) {
      this.selectedCard_1 = card;
    }
    else if (!this.selectedCard_2) {
      this.selectedCard_2 = card;
    }
    if (this.selectedCard_1 && this.selectedCard_2) {
      if (this.selectedCard_1.src === this.selectedCard_2.src) {
        this.selectedCard_1.clickable = false;
        this.selectedCard_2.clickable = false;
        this.selectedCard_1 = null;
        this.selectedCard_2 = null;
        this.stopAudio(this.failAudio);
        this.stopAudio(this.goodAudio);
        this.goodAudio.play();
        this.changeProgress();
        this.checkFinish();
      } else {
        setTimeout(() => {
          this.stopAudio(this.failAudio);
          this.stopAudio(this.goodAudio);
          this.failAudio.play();
          this.flip(this.selectedCard_1);
          this.flip(this.selectedCard_2);
          this.selectedCard_1 = null;
          this.selectedCard_2 = null;
        }, 1000);
      }
    }
  }
  changeProgress() {
    this.progress = this.cards.filter(card => !card.clickable).length / this.appService.numberOfCards * 100;
  }
  checkFinish() {
    if (this.cards.filter(card => !card.clickable).length === this.appService.numberOfCards) {
      /** End of Game */
      this.stopAudio(this.fullTrack);
      this.stopAudio(this.failAudio);
      this.stopAudio(this.goodAudio);
      this.gameOverAudio.play();
    }
  }
  stopAudio(audio: HTMLAudioElement) {
    if (audio.played) {
      audio.pause();
      audio.currentTime = 0;
    }
  }
}
