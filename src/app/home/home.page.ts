import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BarcodeScanner, BarcodeScannerOptions} from '@awesome-cordova-plugins/barcode-scanner/ngx';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @ViewChild('myForm') myForm: ElementRef;
    scannedData: any;
    encodedData: '';
    encodeData: any;
    inputData: any;
    apiData: any;
    truckIdentifier: string;
    inError: boolean;
    form: FormGroup;

  submitted = false;
  constructor(private barcodeScanner: BarcodeScanner, private apiService: ApiService,
              private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }


  ngOnInit(): void {
    this.inError = false;
    this.form = this.formBuilder.group({
      truckId: ['', Validators.required],
    });
  }



  validateTruckId(truckId: string){
    this.apiService.getTruckInformation(truckId).subscribe((data) => {
      this.apiData = data;
      this.inError = false;
      this.router.navigate(['/tabs/rental-details'], {
        state: {
          validationData: this.apiData
        }
      }).then(r => {});
    }, (err) => {
      this.inError = true;
    });
  }


  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData;
      this.truckIdentifier = barcodeData.text;
      this.validateTruckId(this.truckIdentifier);


    }).catch(err => {
      console.log('Error', err);
    });
  }
  showMessage() {
    window.alert('test');
  }
  createBarcode() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.inputData).then((encodedData) => {
      console.log(encodedData);
      this.encodedData = encodedData;
    }, (err) => {
      console.log('Error occured : ' + err);
    });
  }

  private createForm() {
    this.form = this.formBuilder.group({
      truckId:['', [Validators.required]]
    });
  }

  // form: FormGroup;
  // constructor(private formBuilder: FormBuilder) {
  //   this.createForm();
  // }
  //
  // ngOnInit(): void {
  //
  // }
  //
  // private createForm() {
  //   this.form = this.formBuilder.group({
  //     name:['', [Validators.required]]
  //   });
  // }

  // isLinear = false;
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  //
  // constructor(private formBuilder: FormBuilder) {}
  //
  // ngOnInit() {
  //   this.firstFormGroup = this.formBuilder.group({
  //     firstCtrl: ['', Validators.required],
  //   });
  //   this.secondFormGroup = this.formBuilder.group({
  //     secondCtrl: ['', Validators.required],
  //   });
  // }

}
