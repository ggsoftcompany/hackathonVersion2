import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-drop-off',
  templateUrl: './drop-off.page.html',
  styleUrls: ['./drop-off.page.scss'],
})
export class DropOffPage implements OnInit {

  photo: SafeResourceUrl;
  photoO: SafeResourceUrl;
  stillValidating = true;
  currentMiles: string;
  constructor(
    private sanitizer: DomSanitizer) {
    this.currentMiles = '152900';
  }

  ngOnInit() {

  }

  async getPicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      source:CameraSource.Camera,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  async getPictureO() {
    const imageO = await Camera.getPhoto({
      quality: 100,
      source:CameraSource.Camera,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
    this.photoO = this.sanitizer.bypassSecurityTrustResourceUrl(imageO && (imageO.dataUrl));
  }
}
