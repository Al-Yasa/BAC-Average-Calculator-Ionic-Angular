import { Component, OnInit } from '@angular/core';

import { StateService } from 'src/app/services/state.service';
import { Platform } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { HeaderColor } from '@ionic-native/header-color/ngx';
import { Plugins, Capacitor } from '@capacitor/core';
const { SplashScreen, StatusBar, Storage, Modals } = Plugins;

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public backBtnSubscription;
  public branchNames = [];
  public optionalSubjectsCheck = {
    amazigh: false,
    sport: true
  };
  public darkTheme = false;
  public showSplashScreen = true;
  public showSlideScreen = true;
  public slidesOptions = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    private platform: Platform,
    private stateService: StateService,
    private nativePageTransitions: NativePageTransitions,
    private headerColor: HeaderColor
  ) { }

  ngOnInit() {
    this.branchNames = this.stateService.getBranchNames(); // get list of all branch names
    if (Capacitor.isPluginAvailable('Storage')) {
      this.keys().then(keysExist => { // check if keys are stored
        if (keysExist) { // if keys exist then get them
          this.getObject('showSlideScreen').then(showSlideScreen => {
            this.showSlideScreen = showSlideScreen;
            this.getObject('darkTheme').then(isDarkTheme => {
              this.darkTheme = isDarkTheme;
              this.getObject('amazigh').then(amazighCheck => {
                this.optionalSubjectsCheck.amazigh = amazighCheck;
                this.getObject('sport').then(sportCheck => {
                  this.optionalSubjectsCheck.sport = sportCheck;
                  this.stateService.updateOptionalSubjectsCheck('amazigh', this.optionalSubjectsCheck.amazigh); // update service amazigh value
                  this.stateService.updateOptionalSubjectsCheck('sport', this.optionalSubjectsCheck.sport); // update service sport value
                });
              });
            });
          });
        } else { // if keys don't exist then set them
          this.setItem('amazigh', false);
          this.setItem('sport', true);
          this.setItem('darkTheme', false);
          this.setItem('showSlideScreen', true);
        }
      });
    };
  }

  ionViewDidEnter() { // backButton has to be set manualy to exit app
    this.showSlideScreen ? null : document.getElementById('slides').style.display = 'none';
    this.showSplashScreen ? setTimeout(() => SplashScreen.hide(), 500) : null;
    this.backBtnSubscription = this.platform.backButton.subscribe(() => navigator['app'].exitApp());
  }

  updateCheck(e) {
    let optionalSubject = e.target.name;
    let optionalSubjectCheck = e.target.checked;
    this.optionalSubjectsCheck[optionalSubject] = optionalSubjectCheck; // update optionalSubject value
    this.stateService.updateOptionalSubjectsCheck(optionalSubject, optionalSubjectCheck); // update service optionalSubject value
    this.setItem(optionalSubject, optionalSubjectCheck); // update Storage optionalSubject value
  }

  changeTheme() {
    const ROOT_APP = document.querySelector('app-root');
    this.darkTheme = !this.darkTheme;
    this.darkTheme ? ROOT_APP.setAttribute('data-theme', 'dark') : ROOT_APP.setAttribute('data-theme', 'light');
    this.setItem('darkTheme', this.darkTheme); // update Storage darkTheme value
    if (!this.darkTheme) {
      Capacitor.isPluginAvailable('StatusBar') ? StatusBar.setBackgroundColor({ color: '#00c24d' }) : null;
      this.headerColor.tint('#00ab44');
    } else {
      Capacitor.isPluginAvailable('StatusBar') ? StatusBar.setBackgroundColor({ color: '#0c0c0c' }): null;
      this.headerColor.tint('#0c0c0c');
    }
  }

  showInfo() {
    if (Capacitor.isPluginAvailable('Modals')) {
      Modals.alert({
        buttonTitle: 'حسنا',
        title: 'معلومات عن التطبيق',
        message: 'تطبيق حساب معدل الباك (v1.3) يتّبع المنهج الدراسي لدولة الجزائر.\n\nهذا التطبيق ليس تطبيق رسمي من وزارة التربية الجزائرية و لا من الديوان الوطني للإمتحانات و المسابقات.\n\nتصميم و برمجة هذا التطبيق هو جهد فردي.\n\nلا يقوم هذا التطبيق بجمع أي معلومات عن المستخدم.\n\n© 2019 بلحنيش ياسع بن جيلالي، كل الحقوق محفوظة.'
      });
    };
  }

  skipSlides() {
    this.showSlideScreen = false;
    document.getElementById('slides').style.display = 'none';
    this.setItem('showSlideScreen', false);
  }

  ionViewWillLeave() {
    this.showSplashScreen ? this.showSplashScreen = false : null;
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400
    }
    this.nativePageTransitions.slide(options);
    this.backBtnSubscription.unsubscribe(); // backButton unsubscribe to avoid memory leak
  }

  /**
   * Capacitor Storage plugin functions
   */
  async getObject(keyName) {
    const RES = await Storage.get({ key: keyName });
    const KEY_VALUE = JSON.parse(RES.value);
    return KEY_VALUE;
  }

  async keys() {
    const KEYS = await Storage.keys();
    return KEYS.keys.length;
  }

  async setItem(keyName, keyValue) {
    await Storage.set({
      key: keyName,
      value: JSON.stringify(keyValue)
    });
  }
}
