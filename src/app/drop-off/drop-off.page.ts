import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Capacitor} from '@capacitor/core';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-drop-off',
  templateUrl: './drop-off.page.html',
  styleUrls: ['./drop-off.page.scss'],
})
export class DropOffPage implements OnInit {

  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  photo: SafeResourceUrl;
  photoO: SafeResourceUrl;
  isDesktop: boolean;
  stillValidating: boolean = true;
  currentMiles: string;


  constructor(
    private platform: Platform,
    private zone: NgZone,
    private sanitizer: DomSanitizer) { 
      this.currentMiles = '152900';
    }

  ngOnInit() {
    if ((this.platform.is('mobile') && this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.isDesktop = true;
    }
    //this.zone.run(() => {
      setTimeout(function(){
        //this.stillValidating =false;
      },8000);
    //});
  }

  async getPicture() {
    if (!Capacitor.isPluginAvailable('Camera') || (this.isDesktop )) {
      this.filePickerRef.nativeElement.click();
      return;
    }

    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }


  async getPictureO() {
    if (!Capacitor.isPluginAvailable('Camera') || (this.isDesktop )) {
      this.filePickerRef.nativeElement.click();
      return;
    }

    const imageO = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    this.photoO = this.sanitizer.bypassSecurityTrustResourceUrl(imageO && (imageO.dataUrl));
  }

  onFileChoose(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      console.log('File format not supported');
      return;
    }

    reader.onload = () => {
      this.photo = reader.result.toString();
    };
    reader.readAsDataURL(file);

  }

  onFileChooseO(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      console.log('File format not supported');
      return;
    }

    reader.onload = () => {
      this.photoO = reader.result.toString();
    };
    reader.readAsDataURL(file);

  }

}

