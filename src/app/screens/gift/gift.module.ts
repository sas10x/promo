import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiftPageRoutingModule } from './gift-routing.module';

import { GiftPage } from './gift.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiftPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GiftPage]
})
export class GiftPageModule {}
