import { AfterViewInit, Component, ViewChild } from '@angular/core';
declare var google: { maps: {
  TravelMode: any; DirectionsService: new () => any; DirectionsRenderer: new () => any; Map: new (arg0: any, arg1: { zoom: number; center: { lat: number; lng: number; }; }) => any; 
}; };
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit {
  sourceLocation = '';
  destinationLocation = '';
  @ViewChild('mapElement',{static: false}) mapElement: any;
   directionsService = new google.maps.DirectionsService();
   directionsRenderer = new google.maps.DirectionsRenderer();
  
  constructor() {}
  
  ngAfterViewInit(): void {
    this.loadMapWithDirection();
  }

  loadMapWithDirection() {
   
    const map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 },
      });
      this.directionsRenderer.setMap(map);
  }
  calculateAndDisplayRoute() {
    this.directionsService.route(
      {
        origin: {
          query: this.sourceLocation,
        },
        destination: {
          query: this.destinationLocation,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response: any,status: string) => {
        if (status === 'OK'){
          this.directionsRenderer.setDirections(response);
        }
        else{
          window.alert('Directions request failed dut to '+status);
        }
      }
    );
  }
  
}
