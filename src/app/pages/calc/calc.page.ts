import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Plugins, Capacitor } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-calc',
  templateUrl: './calc.page.html',
  styleUrls: ['./calc.page.scss'],
})
export class CalcPage implements OnInit, OnDestroy {
  public branchName = '';
  public arabicBranchName = '';
  public subjects = [];
  public allCoefficients = 0;
  public allMarks = '000.00';
  public average = '00.00';

  constructor(
    private activatedRoute: ActivatedRoute,
    private stateService: StateService,
    private nativePageTransitions: NativePageTransitions
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => { // get branchnName from mainPage
      this.branchName = paramMap.get('branch');
    });
    this.arabicBranchName = this.stateService.getArabicBranchName(this.branchName); // get arabic name from stateService based on branchName
    this.subjects = this.stateService.getBranchSubjects(this.branchName); // get subjects from stateService based on branchName
    this.subjects.forEach(subject => { // calculate branch's total coefficient
      this.allCoefficients += subject.coefficient;
    });
  }

  onCalculateMarks(input) {
    const INPUT_NAME = input.name;
    const INPUT_VALUE = Number(input.value);
    const INPUT_VALID = this.stateService.onValidateInput(INPUT_NAME, INPUT_VALUE); // check inptut validity (update UI and return Boolean value)
    this.allMarks = '000.00';
    this.average = '00.00';
    this.subjects[INPUT_NAME].mark = input.value === '' ? ' ' : INPUT_VALUE;
    if (INPUT_VALID) {
      this.subjects[INPUT_NAME].totalMark = this.stateService.makeThreeDigits((INPUT_VALUE * this.subjects[INPUT_NAME].coefficient).toFixed(2));
      this.calculateTotalAndAverage();
    } else {
      this.subjects[INPUT_NAME].totalMark = '000.00'
      this.calculateTotalAndAverage();
    }
  }

  calculateTotalAndAverage() {
    let allMarksCounter = 0;
    this.subjects.forEach(subject => {
      const INPUT_OUT_OF_RANGE = Number(subject.mark) < 0 || subject.mark > 20;
      const INPUT_DIVISIBLE = Number(subject.mark) % 0.25 === 0; // is the mark decimal value (.00, .25, .50, .75)
      let subjectMark = !INPUT_OUT_OF_RANGE && INPUT_DIVISIBLE ? Number(subject.mark) : 0; // if mark is valid then count it
      allMarksCounter += subjectMark * subject.coefficient;
    });
    this.allMarks = this.stateService.makeThreeDigits(allMarksCounter.toFixed(2)); // update UI
    this.average = this.stateService.makeTwoDigits((allMarksCounter / this.allCoefficients).toFixed(2)); // update UI
  }

  clear() {
    let inputsHaveValues = 0;
    this.subjects.forEach(subject => subject.mark !== '' ? inputsHaveValues += 1: null); // for every input that has a value add +1
    if (inputsHaveValues) {
      this.subjectsReset();
      this.allMarks = '000.00';
      this.average = '00.00';
      document.querySelectorAll('input').forEach(input => {
        input.value = '';
        input.parentElement.parentElement.classList.remove('valid');
        input.parentElement.parentElement.classList.remove('invalid');
      });
      if (Capacitor.isPluginAvailable('Toast')) {
        Toast.show({ duration: 'short' , text: 'تم مسح جميع البيانات' });
      };
    }
  }

  ionViewWillLeave() {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400
    }
    this.nativePageTransitions.slide(options);
  }

  ngOnDestroy() { // reset all subjects marks because of bug where data persists after revisiting calcPage
    this.subjectsReset();
  }

  /**** Helper Functions ****/
  subjectsReset() {
    this.subjects.forEach(subject => {
      subject.mark = '';
      subject.totalMark = '000.00';
    });
  };
}
