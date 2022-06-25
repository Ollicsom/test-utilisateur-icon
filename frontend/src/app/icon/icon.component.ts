import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() file: string | undefined;
  @Output() switchIcon = new EventEmitter<string>();

  constructor(
    private apiService: ApiService
  ) {
    this.form = new FormGroup({
      userGuess: new FormControl()
    })
  }

  time: number = 0;
  timer: any;
  inputDisplayed = false;
  form: FormGroup;
  iconDisplayed = false;


  @ViewChild('input') input: ElementRef | undefined;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {


    if (event.code === 'Space' && this.iconDisplayed) {
      clearInterval(this.timer);
      this.inputDisplayed = true;
      setTimeout(()=>{
        this.input?.nativeElement.focus();
      },0);
    }
    if (event.code === 'Enter' && this.inputDisplayed === true && this.form.value.userGuess) {
      this.nextIcon();
    }
    }

  ngOnInit(): void {
  }

  ngOnChanges() {
    setTimeout(() => {
      this.iconDisplayed = true;
    }, 1500)
    this.startTimer();
    this.time = 0;
    this.inputDisplayed = false;
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.time++;
    },10
    )
  }


  nextIcon() {
    // this.apiService.postInfo(localStorage.getItem('user'), this.file, this.time, this.form.value.userGuess).subscribe();
    this.iconDisplayed = false;
    this.form.controls['userGuess'].setValue(null);
    this.switchIcon.emit(this.file);
  }

}
