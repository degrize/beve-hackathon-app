import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UTILISATION_ROUTE } from './utilisation.route';
import { UtilisationComponent } from './utilisation.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [UtilisationComponent],
  imports: [CommonModule, RouterModule.forChild([UTILISATION_ROUTE]), SharedModule, CarouselModule],
})
export class UtilisationModule {}
