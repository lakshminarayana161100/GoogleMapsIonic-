import { Component,ViewChild, ElementRef ,NgZone,AfterViewInit} from '@angular/core';
import { Platform } from '@ionic/angular';
declare var google: any;


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit {

  @ViewChild('map', { static: false }) mapElement: any;

  dist:any=[];

  map: any;
  address: any;
  lat: any;
  long: any;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  Distance: any;


  OriginLocation: any;
  DestinationLocation: any;
  IsOrigin = false;
  IsDestination = false;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  Dur: any;

  constructor(
    public zone: NgZone, 
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

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

  //LOAD THE MAP ONINIT.
  // ngOnInit() {
  //   this.loadMap();
  // }


  //LOADING THE MAP HAS 2 PARTS.
  // loadMap() {

  //   //FIRST GET THE LOCATION FROM THE DEVICE.
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
  //     let mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }

  //     //LOAD THE MAP WITH THE PREVIOUS VALUES AS PARAMETERS.
  //     this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  //     this.map.addListener('tilesloaded', () => {
  //       console.log('accuracy', this.map, this.map.center.lat());
  //       this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
  //       this.lat = this.map.center.lat()
  //       this.long = this.map.center.lng()
  //     });
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }


  // getAddressFromCoords(lattitude: any, longitude: any) {
  //   console.log("getAddressFromCoords " + lattitude + " " + longitude);
  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 5
  //   };
  //   this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
  //     .then((result: NativeGeocoderResult[]) => {
  //       this.address = "";
  //       let responseAddress = [];
  //       for (let [key, value] of Object.entries(result[0])) {
  //         if (value.length > 0)
  //           responseAddress.push(value);
  //       }
  //       responseAddress.reverse();
  //       for (let value of responseAddress) {
  //         this.address += value + ", ";
  //       }
  //       this.address = this.address.slice(0, -2);
  //     })
  //     .catch((error: any) => {
  //       this.address = "Address Not Available!";
  //     });
  // }

  //FUNCTION SHOWING THE COORDINATES OF THE POINT AT THE CENTER OF THE MAP
  // ShowCords() {
  //   alert('lat' + this.lat + ', long' + this.long)
  // }

  //Get origin and destination location 

  GetOriginLocation(data: any) {
    this.IsOrigin = true;
    this.IsDestination = false;
    console.log(data)
    this.UpdateSearchResults(data);

    // console.log(this.DestinationLocation)

  }

  GetDestinationLocation(data: any) {
    this.IsDestination = true;
    this.IsOrigin = false;
    console.log(data)
    this.UpdateSearchResults(data);

  }


  UpdateSearchResults(data: any) {
    console.log(data)
    this.autocomplete.input = data;
    console.log("UpdateSearchResults")
    if (this.autocomplete.input == '') {

      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions: any[], status: any) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            console.log('places' + prediction)
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }






  //AUTOCOMPLETE, SIMPLY LOAD THE PLACE USING GOOGLE PREDICTIONS AND RETURNING THE ARRAY.
  // UpdateSearchResults(){
  //   console.log("UpdateSearchResults")
  //   if (this.autocomplete.input == '') {
  //     this.autocompleteItems = [];
  //     return;
  //   }
  //   this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
  //   (predictions: any[], status: any) => {
  //     this.autocompleteItems = [];
  //     this.zone.run(() => {
  //       predictions.forEach((prediction) => {
  //         console.log('places'+prediction)
  //         this.autocompleteItems.push(prediction);
  //       });
  //     });
  //   });
  // }

  //wE CALL THIS FROM EACH ITEM.
  SelectSearchResult(item: { place_id: any; description: any }) {
    ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    //alert(JSON.stringify(item))   
    console.log(item.description)
    this.placeid = item.description;


    if (this.IsOrigin) {
      this.OriginLocation = item.description;
      this.autocompleteItems = [];
    }
    else if (this.IsDestination) {
      this.DestinationLocation = item.description;
      this.autocompleteItems = [];
    }
  }

  //this is a main function
  calculateAndDisplayRoute() {
    this.directionsService.route(
      {
        origin: {
          //this.Originlocation
          query: this.OriginLocation,
        },
        destination: {
          //this.destination location
          query: this.DestinationLocation,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response: any, status: string) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(response);
          console.log(response.routes)
          var dist = response.routes;
          for (let i = 0; i < dist.length; i++) {
             this.Distance = dist[i].legs[i].distance.text
             this.Dur = dist[i].legs[i].duration.text
            console.log(this.Distance)
            console.log(this.Dur)
          }
        }
        else {
          window.alert('Directions request failed dut to ' + status);
        }
      }
    );
  }

  //lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.
  ClearAutocomplete() {
    this.autocompleteItems = []
    this.autocomplete.input = ''
  }

  //sIMPLE EXAMPLE TO OPEN AN URL WITH THE PLACEID AS PARAMETER.
  GoTo() {
    return window.location.href = 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=' + this.placeid;
  }

}




