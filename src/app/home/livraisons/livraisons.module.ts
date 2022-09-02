import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivraisonsPageRoutingModule } from './livraisons-routing.module';

import { LivraisonsPage } from './livraisons.page';
import { QRCodeModule} from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivraisonsPageRoutingModule,
    QRCodeModule
  ],
  declarations: [LivraisonsPage]
})
export class LivraisonsPageModule {}

