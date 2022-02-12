import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {
  AlertController,
  IonRouterOutlet,
  LoadingController,
} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.page.html',
  styleUrls: ['./rental-details.page.scss'],
})
export class RentalDetailsPage implements OnInit {
  mapZoom = 12;
  mapCenter: google.maps.LatLngLiteral;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
    disableDefaultUI: true
  };

  // Gets a reference to the list element

  dayIndex = 0;
  validationData: any;
  truckType: string;
  truckYear: string;
  truckVin: string;
  truckImage: string;
  currentLocationObject: any;
  locationAddress: string;
  locationPhone: string;
  locationLat: string;
  locationLong: string;
  customerObject: any;
  customerName: string;
  customerAddress: string;
  customerType: string;
  step = 0;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public router: Router,
    public routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {

    this.validationData = this.router.getCurrentNavigation().extras.state.validationData;
    this.truckType = this.validationData.truck.model;
    this.truckYear = this.validationData.truck.year;
    this.truckVin = this.validationData.truck.vinNumber;
    this.truckImage = `../../../assets/img/${this.validationData.truck.modelId}.jpg`;
    this.currentLocationObject = this.validationData.currentRentalLocation;
    this.customerObject = this.validationData.customer;
    this.customerName = this.customerObject.name;
    this.customerAddress = this.customerObject.address;
    this.customerType = this.customerObject.type;
    if(this.currentLocationObject!=null) {
      this.locationAddress = this.currentLocationObject.address;
      this.locationPhone = this.currentLocationObject.phone;

      this.mapCenter = {
        lat: this.currentLocationObject.latitude,
        lng: this.currentLocationObject.longitude
      };
    }else{
      window.alert('no esta en la yarda');
    }


  }



  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }



}
