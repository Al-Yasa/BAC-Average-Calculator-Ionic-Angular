import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public optionalSubjectsCheck = {
    amazigh: false,
    sport: true
  };
  public optionalSubjects = {
    amazigh: { name: "اللغة الأمازيغية", coefficient: 2, mark: "", totalMark: "000.00" },
    sport: { name: "تربية بدنية", coefficient: 1, mark: "", totalMark: "000.00" }
  };
  public branches = {
      math: [
          { name: "رياضيات", coefficient: 7, mark: "", totalMark: "000.00" },
          { name: "علوم فيزيائية", coefficient: 6, mark: "", totalMark: "000.00" },
          { name: "لغة عربية", coefficient: 3, mark: "", totalMark: "000.00" },
          { name: "علوم طبيعية", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "تاريخ و جغرافيا", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "لغة فرنسية", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "لغة إنجليزية", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "فلسفة", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "علوم إسلامية", coefficient: 2, mark: "", totalMark: "000.00" }
      ],
      science: [
          { name: "علوم طبيعية", coefficient: 6, mark: "", totalMark: "000.00" },
          { name: "علوم فيزيائية", coefficient: 5, mark: "", totalMark: "000.00" },
          { name: "رياضيات", coefficient: 5, mark: "", totalMark: "000.00" },
          { name: "لغة عربية", coefficient: 3, mark: "", totalMark: "000.00" },
          { name: "لغة فرنسية", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "لغة إنجليزية", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "فلسفة", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "تاريخ و جغرافيا", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "علوم إسلامية", coefficient: 2, mark: "", totalMark: "000.00" }
      ],
      literature: [
          { name: "لغة عربية", coefficient: 6, mark: "", totalMark: "000.00" },
          { name: "فلسفة", coefficient: 6, mark: "", totalMark: "000.00" },
          { name: "تاريخ و جغرافيا", coefficient: 4, mark: "", totalMark: "000.00" },
          { name: "لغة فرنسية", coefficient: 3, mark: "", totalMark: "000.00" },
          { name: "لغة إنجليزية", coefficient: 3, mark: "", totalMark: "000.00" },
          { name: "رياضيات", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "علوم إسلامية", coefficient: 2, mark: "", totalMark: "000.00" },
      ],
      languages: [
          { name: "لغة عربية", coefficient: 5, mark: "", totalMark: "000.00" },
          { name: "لغة فرنسية", coefficient: 5, mark: "", totalMark: "000.00" },
          { name: "لغة إنجليزية", coefficient: 5, mark: "", totalMark: "000.00" },
          { name: "لغة أجنبية ثالثة", coefficient: 4, mark: "", totalMark: "000.00" },
          { name: "فلسفة", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "تاريخ و جغرافيا", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "رياضيات", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "علوم إسلامية", coefficient: 2, mark: "", totalMark: "000.00" }
      ],
      management: [
          { name: "تسيير محاسبي و مالي", coefficient: 6, mark: "", totalMark: "000.00" },
          { name: "الإقتصاد و المناجمنت", coefficient: 5, mark: "", totalMark: "000.00" },
          { name: "رياضيات", coefficient: 5, mark: "", totalMark: "000.00" },
          { name: "تاريخ و جغرافيا", coefficient: 4, mark: "", totalMark: "000.00" },
          { name: "لغة عربية", coefficient: 3, mark: "", totalMark: "000.00" },
          { name: "قانون", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "لغة فرنسية", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "لغة إنجليزية", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "فلسفة", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "علوم إسلامية", coefficient: 2, mark: "", totalMark: "000.00" }
      ],
      tech: [
          { name: "تكنولوجيا", coefficient: 7, mark: "", totalMark: "000.00" },
          { name: "رياضيات", coefficient: 6, mark: "", totalMark: "000.00" },
          { name: "علوم فيزيائية", coefficient: 6, mark: "", totalMark: "000.00" },
          { name: "لغة عربية", coefficient: 3, mark: "", totalMark: "000.00" },
          { name: "لغة فرنسية", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "لغة إنجليزية", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "فلسفة", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "تاريخ و جغرافيا", coefficient: 2, mark: "", totalMark: "000.00" },
          { name: "علوم إسلامية", coefficient: 2, mark: "", totalMark: "000.00" }
      ]
  }
  public branchNames = [
    ['math', 'رياضيات', '../assets/icon/math.svg'],
    ['science', 'علوم تجريبية', '../assets/icon/science.svg'],
    ['literature', 'آداب و فلسفة', '../assets/icon/literature.svg'],
    ['languages', 'لغات أجنبية', '../assets/icon/languages.svg'],
    ['management', 'تسيير و اقتصاد', '../assets/icon/management.svg'],
    ['tech', 'تقني رياضي', '../assets/icon/tech.svg']
  ];

  constructor() {}

  updateOptionalSubjectsCheck(optionalSubject, optionalSubjectCheck) {
    this.optionalSubjectsCheck[optionalSubject] = optionalSubjectCheck;
  }

  getBranchSubjects(branchName) {
    let subjects = [...this.branches[branchName]];
    subjects = this.onOptionalSubjects(subjects);
    return subjects;
  }

  getBranchNames() {
    return this.branchNames;
  }

  getArabicBranchName(branch) {
    return this.branchNames.filter(branchName => branchName[0] === branch)[0][1];
  }

  /**
   *  this function adds optional subjects if any are selected
   *  param {Array} default subjects
   *  returns {Array} default subjects with added optional subjects
   */
  onOptionalSubjects(subjects) {
    const AMAZIGH_SUBJECT = this.optionalSubjects.amazigh;
    const SPORT_SUBJECT = this.optionalSubjects.sport;
    const AMAZIGH_CHOSEN = this.optionalSubjectsCheck.amazigh;
    const SPORT_CHOSEN = this.optionalSubjectsCheck.sport;
    AMAZIGH_CHOSEN ? subjects.splice(subjects.length - 1, 0, AMAZIGH_SUBJECT) : null;
    SPORT_CHOSEN ? subjects.push(SPORT_SUBJECT) : null;
    return subjects;
  }

  /**
   *  this function is for validating the user input in-order to give visual feedback (valid, invalid, nothing)
   *  param: {Number} mark - mark input value
   *  param: {Number} subjectIndex
   */
  onValidateInput = (inputName, inputValue) => {
    const INPUT_GROUPE = document.querySelector(`input[name="${inputName}"]`).parentElement.parentElement;
    const INPUT_OUT_OF_RANGE = inputValue < 0 || inputValue > 20;
    const INPUT_DIVISIBLE = inputValue % 0.25 === 0; // is the mark decimal value (.00, .25, .50, .75)
    (INPUT_OUT_OF_RANGE || !INPUT_DIVISIBLE) ? this.onModifyClass(INPUT_GROUPE, 0) : this.onModifyClass(INPUT_GROUPE, 1);
    const VALIDITY = !INPUT_OUT_OF_RANGE && INPUT_DIVISIBLE;
    return VALIDITY;
  }

  /**** Helper Functions ****/

  /**
   *  this helper function is for adding CSS classes to HTML elements
   *  param: {HTMLElement} HTMLElement
   *  param: {Number} inputState
   */
  onModifyClass(HTMLElement, inputState) {
    if (inputState) {
      HTMLElement.classList.remove('invalid');
      HTMLElement.classList.add('valid');
    } else {
      HTMLElement.classList.remove('valid');
      HTMLElement.classList.add('invalid');
    }
    if (!HTMLElement.lastChild.value) {
      HTMLElement.classList.remove('valid');
      HTMLElement.classList.remove('invalid');
    }
  }

  /**
   *  this helper function is for adding '0' digits for numbers below 100
   *  param: {string} number
   *  returns {String} number
   */
  makeThreeDigits = number => {
    return (Number(number) < 100 && Number(number) > 9) ? `0${number}` : Number(number) < 10 ? `00${number}` : number;
  }

  /**
   *  this helper function is for adding digit '0' for numbers below 10
   *  param: {string} number
   *  returns {String} number
   */
  makeTwoDigits = number => {
    return Number(number) < 10 ? `0${number}` : number;
  }
}
