import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { HeaderColor } from '@ionic-native/header-color/ngx';
import { Plugins, Capacitor } from '@capacitor/core';
const { StatusBar, Storage } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private headerColor: HeaderColor
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.getObject('darkTheme').then(isDarkTheme => { // get darkTheme value from Storage
        if (!isDarkTheme) { // if darkTheme value is false or null then set default lightTheme
          document.querySelector('app-root').setAttribute('data-theme', 'light');
          Capacitor.isPluginAvailable('StatusBar') ? StatusBar.setBackgroundColor({ color: '#00c24d' }) : null;
          this.headerColor.tint('#00ab44');
        } else {
          document.querySelector('app-root').setAttribute('data-theme', 'dark');
          Capacitor.isPluginAvailable('StatusBar') ? StatusBar.setBackgroundColor({ color: '#0c0c0c' }) : null;
          this.headerColor.tint('#0c0c0c');
        };
      });
    });
  }

  /**
   * Capacitor Storage plugin functions
   */
  async getObject(keyName) {
    const RES = await Storage.get({ key: keyName });
    const KEY_VALUE = JSON.parse(RES.value);
    return KEY_VALUE;
  }
}
