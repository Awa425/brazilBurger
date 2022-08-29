import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CataloguePageModule } from './catalogue/catalogue.module';
import { LivraisonsPageModule } from './livraisons/livraisons.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CataloguePageModule,
    LivraisonsPageModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomePage,
  ]
})
export class HomePageModule {}
