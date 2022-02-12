import {Component, OnInit} from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(public platform: Platform) {}

  ngOnInit(): void {
    this.platform.ready().then(async () => {
      if (this.platform.is('hybrid')) {
        setTimeout(async ()=>{await SplashScreen.hide();},3000);
      }
    });
  }
}
