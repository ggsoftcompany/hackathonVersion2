import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  isDesktop: boolean;


  constructor(
    private platform: Platform,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if ((this.platform.is('mobile') && this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.isDesktop = true;
    }
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

}
