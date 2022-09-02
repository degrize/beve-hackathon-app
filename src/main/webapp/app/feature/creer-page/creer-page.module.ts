import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CreerPageComponent } from './creer-page.component';
import { RouterModule } from '@angular/router';
import { CREATE_PAGE_ROUTE } from './creer-page.route';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [CreerPageComponent],
  imports: [RouterModule.forChild([CREATE_PAGE_ROUTE]), SharedModule, CarouselModule, SwiperModule],
})
export class CreerPageModule {}
