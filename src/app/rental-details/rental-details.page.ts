import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {
  AlertController,
  IonRouterOutlet,
  LoadingController,
} from '@ionic/angular';
import {Router} from '@angular/router';
import { animation } from '@angular/animations';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.page.html',
  styleUrls: ['./rental-details.page.scss'],
})
export class RentalDetailsPage implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  mapZoom = 12;
  mapCenter: google.maps.LatLngLiteral;
  mapOptions: google.maps.MapOptions = {
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
  makerOptions: any;
  markerLabelDriver: any;
  markerLabelRyder: any;

  step = 0;
  markers: any;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public router: Router,
    public routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {
    this.makerOptions ={ animation: google.maps.Animation.BOUNCE };

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
      this.locationAddress = this.currentLocationObject.address;
      this.locationPhone = this.currentLocationObject.phone;
      this.mapCenter = {
        lat: this.currentLocationObject.latitude,
        lng: this.currentLocationObject.longitude
      };
      this.markerLabelDriver = {
        color: 'yellow',
        text: this.locationAddress,
      };
      this.markerLabelRyder = {
        color: 'green',
        text: this.locationAddress,
      };
    }else{
      window.alert('The truck is not in any rental location...at this point we can show a list of the nearby locations.');
    }


  }

  dropOff(){
    this.router.navigate(['/tabs/drop-off'], {
      state: {
        validationData: this.validationData
      }
    }).then(r =>{});

   }
  addMarker() {
    this.markers.push({
      position: {
        lat: this.locationLat,
        lng: this.locationLong,
      },
      label: {
        color: 'green',
        text: 'You are current at ' + this.locationAddress,
      },
      title: 'Your current Location ',
      options: { animation: google.maps.Animation.BOUNCE },
    });

    this.markers.push({
      position: {
        lat: this.locationLat,
        lng: this.locationLong,
      },
      label: {
        color: 'red',
        text: 'Ryder Location' + this.locationAddress,
      },
      title: 'Ryder Location ',
      options: { animation: google.maps.Animation.BOUNCE },
    });
  }


}
