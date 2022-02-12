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
  stillValidating = true;
  constructor( private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
      setTimeout(() => {
        this.stillValidating = false;
      },8000);
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

  // onFileChoose(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   const pattern = /image-*/;
  //   const reader = new FileReader();
  //
  //   if (!file.type.match(pattern)) {
  //     console.log('File format not supported');
  //     return;
  //   }
  //
  //   reader.onload = () => {
  //     this.photo = reader.result.toString();
  //   };
  //   reader.readAsDataURL(file);
  //
  // }

}
