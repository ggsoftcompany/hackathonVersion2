import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import {ApiService} from '../api.service';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  mapCenter: google.maps.LatLngLiteral;
  mapZoom = 5;
  mapOptions: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 5,
    disableDefaultUI: false
  };
  rentalLocations: any[] = [];
  currentLocation: any;
  constructor(private apiService: ApiService, public platform: Platform) { }

  async ngOnInit() {
    this.platform.ready().then(async () => {
      if (this.platform.is('hybrid')) {
        this.currentLocation = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
        this.mapCenter = {
          lat: this.currentLocation.coords.latitude,
          lng: this.currentLocation.coords.longitude
        };
      }
      else{
        this.mapCenter = {
          lat: 40.56849827465577,
          lng:-88.01095925553179
        };
      }
      this.apiService.getLocationsNear(this.mapCenter.lat, this.mapCenter.lng).subscribe((data)=>{
        this.rentalLocations = [];
        data.forEach((item)=>{
          this.rentalLocations.push({
            position: {
              lat: item.latitude,
              lng: item.longitude
            },
            label: {
              color: 'red',
              text: `Marker label ${item.id}`
            },
            title: `${item.address}`,
            options: { animation: google.maps.Animation.BOUNCE }
          });
        });
      });
    });

  }

}
