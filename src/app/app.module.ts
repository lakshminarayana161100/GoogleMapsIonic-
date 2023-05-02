import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { GoogleMaps } from '@ionic-native/google-maps';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule} from 'agm-direction';

import { provideStorage,getStorage } from '@angular/fire/storage';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
//IMPORT THE PLUGINS
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [AppComponent],
  imports: [  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyDhkQAE-iE2lzlFrmWxEXEYDFHGkzKSAYk'
  }),
  AgmDirectionModule,
    
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,ReactiveFormsModule,provideFirebaseApp(() => initializeApp()), provideStorage(() => getStorage()), provideFirestore(() => getFirestore())

  ],
  providers: [ //ADD GEOLOCATION Y GEOCODER ON THE PROVIDERS.
  Geolocation,  GoogleMaps, 
  NativeGeocoder,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {
  
}
