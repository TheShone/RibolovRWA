import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() maxRating=5;
  maxRatingArr:any = [];
  @Input() SelectedStar=0;
  previousSelection = 0;
  @Input() initialRating = 0;
  @Input() locked = false;
  @Output()
  onRaiting:EventEmitter<number> = new EventEmitter<number>();
  constructor(){
  }
  HandleMouseEnter(index:number)
    {
      if (!this.locked) {
        this.SelectedStar = index + 1;
      }
    }
    HandleMouseLeave()
    {
      if (!this.locked) {
        if (this.previousSelection !== 0) {
          this.SelectedStar = this.previousSelection;
        } else {
          this.SelectedStar = 0;
        }
      }
    }
    Rating(index: number)
    {
      if (!this.locked) {
        this.SelectedStar = index + 1;
        this.previousSelection = this.SelectedStar;
        this.onRaiting.emit(this.SelectedStar);
      }
    }
  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0);
    this.SelectedStar = this.initialRating;
  }

}
