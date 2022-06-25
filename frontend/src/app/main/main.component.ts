import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  files: Array<string> = [];
  filesCopy: Array<string> = [];
  iconIndex: number = 0;
  dataFetched = false;
  step = 0;
  phase = 0;
  spaceEnabled = true;
  iconTrainingIndex: number = 0;
  trainingIcons = ['test01.png', 'test02.png', 'test03.png'];
  rebourdStrings = ['3', '2', '1', "C'est parti !"];
  rebourdIndex = 0;
  userForm: FormGroup;

  constructor(
    private apiService: ApiService,
  ) {

    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.maxLength(128)]),
      age: new FormControl(null, [Validators.required, Validators.min(0)]),
      sex: new FormControl(null, [Validators.required]),
    })
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
      if (event.code === 'Space' && this.spaceEnabled) {
        this.incrementStep();
      }
    }

  ngOnInit(): void {
    this.apiService.getIcons().subscribe(res => {
      this.files = res.files;
      this.filesCopy = [...res.files];
      this.iconIndex = Math.round(Math.random()*(this.filesCopy.length-1));
      this.dataFetched = true;
    });

    
    this.phase = parseInt(localStorage.getItem('phase') || '0', 10);
    this.step = parseInt(localStorage.getItem('step') || '0', 10);

    this.checkUser();
  }

  nextIcon(lastIcon: string) {
    if(this.phase === 2) {
      this.filesCopy.splice(this.filesCopy.findIndex(file => file === lastIcon), 1);
      if(this.filesCopy.length === 0) {
        this.endSession();
      }
      this.iconIndex = Math.round(Math.random()*(this.filesCopy.length-1));
    }
    if(this.phase === 1) {
      if(this.iconTrainingIndex >= this.trainingIcons.length - 1) {
        this.incrementStep();
      }
      this.iconTrainingIndex++;
    }
  }

  checkUser() {
    if(!localStorage.getItem('name') || !localStorage.getItem('age') || !localStorage.getItem('sex') ) {
        this.phase = -1;
    }
  }

  async endSession() {
  //   this.apiService.getCSV()
  //   localStorage.removeItem('user');
  //   this.filesCopy = [...this.files];
  //   this.checkUser();
  }

  lauchRebourd() {
    this.rebourdIndex ++;
    if(this.rebourdIndex == 4 ){
      this.rebourdIndex = 0;
      this.incrementStep();
    } else {
      setTimeout(() => {
        this.lauchRebourd();
      }, 1000)
    }
  }

  incrementStep() {
    this.step ++;
    if(this.step === 5 && this.phase === 0){
      this.step = 0;
      this.phase ++;
      this.spaceEnabled = false;
      setTimeout(() => {
        this.lauchRebourd();
      }, 1000)
    }
    if(this.step === 3 && this.phase === 1) {
      this.step = 0;
      this.phase++;
      this.rebourdIndex = 0;
      this.spaceEnabled = false;
      setTimeout(() => {
        this.lauchRebourd();
      }, 1000)
    }

    localStorage.setItem('phase', this.phase.toString());
    localStorage.setItem('step', this.step.toString());
  }

  resetStepPhase() {
    this.rebourdIndex = 0;
    this.spaceEnabled = true;
    this.step = 0;
    this.phase = 0;

    localStorage.setItem('phase', this.phase.toString());
    localStorage.setItem('step', this.step.toString());
  }

  saveUserData() {
    localStorage.setItem('name', this.userForm.value.name);
    localStorage.setItem('age', this.userForm.value.age);
    localStorage.setItem('sex', this.userForm.value.sex);
    this.phase = parseInt(localStorage.getItem('phase') || '0', 10);
  }

    public get name() {
        return this.userForm.get('name')
    }

    public get age() {
        return this.userForm.get('age')
    }

    public get sex() {
        return this.userForm.get('sex')
    }

    log(value: any) {
        console.log(value)
    }
}